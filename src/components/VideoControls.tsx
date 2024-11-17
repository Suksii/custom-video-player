import { ChangeEvent, useState } from "react";

type VideoControlsProps = {
  currentTime: number;
  duration: number;
  onTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
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

  const percentage = (currentTime / duration) * 100;

  return (
    <div className="flex gap-4 items-center w-full text-white">
      <p>{formatTime(currentTime)}</p>
      <div className="relative w-full">
        <div className="relative h-1 bg-white">
          <div
            className="absolute top-0 left-0 h-1 bg-gray-800"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        >
          <div className="w-4 h-4 bg-gray-900 rounded-full cursor-pointer shadow-lg transition-transform duration-200 hover:scale-110" />
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={onTimeChange}
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
        />
      </div>
      <p>{formatTime(duration - currentTime)}</p>
    </div>
  );
}

export default VideoControls;
