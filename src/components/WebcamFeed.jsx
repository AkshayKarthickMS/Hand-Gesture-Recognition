export default function WebcamFeed({ videoRef, isLoading, cameraPermission }) {
  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl border border-slate-700">
      {/* Status indicators */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 backdrop-blur-sm">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 mb-4">
              <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-slate-300">Initializing camera...</p>
          </div>
        </div>
      )}

      {cameraPermission === false && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 backdrop-blur-sm">
          <div className="text-center text-red-300">
            <div className="text-4xl mb-4">🚫</div>
            <p className="font-semibold">Camera access required</p>
            <p className="text-sm text-slate-400 mt-2">Please allow camera permissions</p>
          </div>
        </div>
      )}

      {/* Recording indicator */}
      {cameraPermission === true && !isLoading && (
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-red-400">LIVE</span>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-auto aspect-video object-cover"
        autoPlay
        playsInline
        muted
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-white"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
