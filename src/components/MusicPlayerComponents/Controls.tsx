export default function Controls({
  isPlaying,
  loop,
  onPlayPause,
  onPrev,
  onNext,
  onToggleLoop,
  onTogglePlaylist,
  onShowAdd,
}: {
  isPlaying: boolean;
  loop: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleLoop: () => void;
  onTogglePlaylist: () => void;
  onShowAdd: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between">
      <button
        onClick={onToggleLoop}
        className={`px-4 py-2 rounded ${loop ? "bg-pink-600" : "bg-gray-700"} hover:bg-pink-500`}
      >
        Loop
      </button>

      <button onClick={onPrev} className="px-4 py-2 bg-gray-700 hover:bg-pink-500 rounded">
        Prev
      </button>

      <button onClick={onPlayPause} className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded">
        {isPlaying ? "Pause" : "Play"}
      </button>

      <button onClick={onNext} className="px-4 py-2 bg-gray-700 hover:bg-pink-500 rounded">
        Next
      </button>

      <button onClick={onTogglePlaylist} className="px-4 py-2 bg-gray-700 hover:bg-pink-500 rounded">
        Playlist
      </button>

      <button
        onClick={onShowAdd}
        className="text-white bg-pink-600 w-10 h-10 text-xl rounded-full flex items-center justify-center hover:bg-pink-500"
      >
        +
      </button>
    </div>
  );
}
