export default function ModelInfo() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-sm">
      <h3 className="font-semibold text-white mb-4">Model Details</h3>

      <div className="space-y-3">
        <div>
          <p className="text-slate-400 text-xs mb-1">Architecture</p>
          <p className="text-white">Convolutional Neural Network (CNN)</p>
        </div>

        <div>
          <p className="text-slate-400 text-xs mb-1">Parameters</p>
          <p className="text-white">4.1M trainable</p>
        </div>

        <div>
          <p className="text-slate-400 text-xs mb-1">Input Size</p>
          <p className="text-white">150 × 150 (Grayscale)</p>
        </div>

        <div>
          <p className="text-slate-400 text-xs mb-1">Classes</p>
          <p className="text-white">10 Hand Gestures</p>
        </div>

        <div>
          <p className="text-slate-400 text-xs mb-1">Val. Accuracy</p>
          <p className="text-emerald-400 font-semibold">99.98%</p>
        </div>

        <div>
          <p className="text-slate-400 text-xs mb-1">Framework</p>
          <p className="text-white">TensorFlow.js</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded text-xs text-blue-300">
        <p className="font-semibold mb-1">💡 Tip:</p>
        <p>Ensure good lighting and position your entire hand within the camera frame for best results.</p>
      </div>
    </div>
  )
}
