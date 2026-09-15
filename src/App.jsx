import { useState, useEffect, useRef } from 'react'
import GestureRecognizer from './components/GestureRecognizer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🖐️</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Hand Gesture Recognition</h1>
                <p className="text-sm text-slate-400">Real-time Detection using Deep Learning</p>
              </div>
            </div>
            <div className="text-xs bg-emerald-900/30 text-emerald-300 px-3 py-1 rounded-full border border-emerald-700">
              99.96% Accuracy
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GestureRecognizer />
      </main>

      <footer className="border-t border-slate-700 bg-slate-900/80 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <p>Hand Gesture Recognition System • CNN Model with TensorFlow</p>
            <p className="mt-2 md:mt-0">Recognizes 10 different hand gestures in real-time</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
