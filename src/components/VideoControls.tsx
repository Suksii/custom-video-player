type VideoControlsProps = {
  currentTime: number;
  duration: number;
  onTimeChange: () => void;
};

function VideoControls({
  currentTime,
  duration,
  onTimeChange,
}: VideoControlsProps) {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex gap-4 items-center w-full px-8 text-white">
      <p>{formatTime(currentTime)}</p>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={onTimeChange}
        className="w-full cursor-pointer"
      />
      <p>{formatTime(duration - currentTime)}</p>
    </div>
  );
}

export default VideoControls;
