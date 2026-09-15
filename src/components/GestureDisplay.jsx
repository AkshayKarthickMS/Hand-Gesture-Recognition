export default function GestureDisplay({ prediction, gestureLabels, isModelLoaded }) {
  if (!isModelLoaded) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mx-auto mb-3"></div>
          <p className="text-slate-400">Loading model...</p>
        </div>
      </div>
    )
  }

  if (!prediction) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center h-96 flex items-center justify-center">
        <div>
          <p className="text-slate-400 text-lg">Waiting for gesture...</p>
          <p className="text-slate-500 text-sm mt-2">Position your hand in the camera view</p>
        </div>
      </div>
    )
  }

  const gesture = gestureLabels[prediction.gestureIndex]
  const confidence = (prediction.confidence * 100).toFixed(1)

  // Get top 3 predictions
  const topPredictions = prediction.allPredictions
    .map((score, index) => ({ index, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return (
    <div className="space-y-4">
      {/* Main Gesture Card */}
      <div className={`bg-gradient-to-br ${gesture.color} rounded-lg p-6 text-white shadow-lg`}>
        <p className="text-xs uppercase tracking-wider opacity-80 mb-2">Detected Gesture</p>
        <div className="text-6xl mb-4">{gesture.emoji}</div>
        <h2 className="text-2xl font-bold mb-3">{gesture.name}</h2>

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Confidence</span>
            <span className="font-semibold">{confidence}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white rounded-full h-full transition-all duration-200"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top Predictions */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Top Predictions</p>
        <div className="space-y-2">
          {topPredictions.map((pred, idx) => {
            const g = gestureLabels[pred.index]
            const score = (pred.score * 100).toFixed(1)
            return (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="text-lg">{g.emoji}</span>
                  <span className="text-white truncate">{g.name}</span>
                </div>
                <div className="flex items-center space-x-2 ml-2">
                  <div className="w-16 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-400 h-full rounded-full transition-all duration-200"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="text-slate-400 w-10 text-right text-xs">{score}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Model</p>
          <p className="text-white font-semibold">CNN - TensorFlow</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Accuracy</p>
          <p className="text-white font-semibold">99.96%</p>
        </div>
      </div>
    </div>
  )
}
