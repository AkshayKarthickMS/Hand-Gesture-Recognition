import { useState, useEffect, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import WebcamFeed from './WebcamFeed'
import GestureDisplay from './GestureDisplay'
import ModelInfo from './ModelInfo'

const GESTURE_LABELS = {
  0: { name: 'Palm', emoji: '✋', color: 'from-blue-500 to-cyan-500' },
  1: { name: 'L Shape', emoji: '👉', color: 'from-purple-500 to-pink-500' },
  2: { name: 'Fist', emoji: '✊', color: 'from-red-500 to-orange-500' },
  3: { name: 'Fist Moved', emoji: '👊', color: 'from-orange-500 to-yellow-500' },
  4: { name: 'Thumb', emoji: '👍', color: 'from-green-500 to-emerald-500' },
  5: { name: 'Index', emoji: '☝️', color: 'from-indigo-500 to-blue-500' },
  6: { name: 'OK Sign', emoji: '👌', color: 'from-pink-500 to-rose-500' },
  7: { name: 'Palm Moved', emoji: '🤚', color: 'from-cyan-500 to-blue-500' },
  8: { name: 'C Shape', emoji: '🤌', color: 'from-yellow-500 to-orange-500' },
  9: { name: 'Down', emoji: '👎', color: 'from-slate-500 to-gray-500' },
}

export default function GestureRecognizer() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [model, setModel] = useState(null)
  const modelRef = useRef(null)
  const [prediction, setPrediction] = useState(null)
  const [stream, setStream] = useState(null)
  const [cameraPermission, setCameraPermission] = useState(null)
  const predictionIntervalRef = useRef(null)

  // Initialize model and camera
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Loading TensorFlow.js...')
        await tf.ready()

        await loadModel()

        // Request camera access
        await requestCameraAccess()
      } catch (err) {
        console.error('Initialization error:', err)
        setError(`Failed to initialize: ${err.message}`)
      }
    }

    initializeApp()

    return () => {
      if (predictionIntervalRef.current) {
        clearInterval(predictionIntervalRef.current)
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const requestCameraAccess = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          startPrediction()
        }
      }

      setStream(mediaStream)
      setCameraPermission(true)
    } catch (err) {
      console.error('Camera access error:', err)
      setCameraPermission(false)
      setError('Camera access denied. Please allow camera permissions to use this app.')
    }
  }

  const loadModel = async () => {
    const loadedModel = await tf.loadLayersModel('/model/model.json')
    // Warm up the model so the first real prediction isn't slow
    const warmup = loadedModel.predict(tf.zeros([1, 150, 150, 1]))
    warmup.dispose()

    modelRef.current = loadedModel
    setModel(loadedModel)
    setIsModelLoaded(true)
    setIsLoading(false)
  }

  const startPrediction = () => {
    predictionIntervalRef.current = setInterval(async () => {
      if (videoRef.current && modelRef.current && canvasRef.current) {
        try {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')

          // Draw video frame to canvas
          ctx.drawImage(videoRef.current, 0, 0, 150, 150)

          // Get image data and prepare for model
          const imageData = ctx.getImageData(0, 0, 150, 150)

          // Convert to grayscale and normalize
          let grayscale = []
          for (let i = 0; i < imageData.data.length; i += 4) {
            const gray = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3
            grayscale.push(gray / 255.0)
          }

          // Reshape for model input
          const input = tf.tensor4d(grayscale, [1, 150, 150, 1])

          // Make prediction
          const output = modelRef.current.predict(input)
          const predictions = Array.from(output.dataSync())

          // Get top prediction
          const maxIndex = predictions.indexOf(Math.max(...predictions))
          const confidence = Math.max(...predictions)

          setPrediction({
            gestureIndex: maxIndex,
            confidence: confidence,
            allPredictions: predictions
          })

          // Cleanup tensors
          input.dispose()
          output.dispose()
        } catch (err) {
          console.error('Prediction error:', err)
        }
      }
    }, 100)
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-red-300">
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Camera Feed */}
        <div className="lg:col-span-2">
          <WebcamFeed
            videoRef={videoRef}
            isLoading={isLoading}
            cameraPermission={cameraPermission}
          />
          <canvas
            ref={canvasRef}
            width={150}
            height={150}
            className="hidden"
          />
        </div>

        {/* Gesture Display & Info */}
        <div className="space-y-6">
          <GestureDisplay
            prediction={prediction}
            gestureLabels={GESTURE_LABELS}
            isModelLoaded={isModelLoaded}
          />
          <ModelInfo />
        </div>
      </div>

      {/* Gesture Legend */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recognized Gestures</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(GESTURE_LABELS).map(([index, gesture]) => (
            <div
              key={index}
              className="text-center p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <div className="text-3xl mb-2">{gesture.emoji}</div>
              <div className="text-sm font-medium text-white">{gesture.name}</div>
              <div className="text-xs text-slate-400 mt-1">#{parseInt(index)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
