import { useState } from "react";
import { IoVolumeMediumSharp, IoVolumeMute } from "react-icons/io5";

type SoundProps = {
  volume: number;
  isMuted: boolean;
  onSoundChange: (value: number) => void;
  toggleMute: () => void;
};

function Sound({ volume, isMuted, onSoundChange, toggleMute }: SoundProps) {
  const [showRange, setShowRange] = useState(false);
  const percentage = volume * 100;
  return (
    <div className="relative flex items-center text-white">
      <div
        className="text-white px-4 cursor-pointer"
        onClick={() => setShowRange((prev) => !prev)}
      >
        {isMuted ? (
          <IoVolumeMute size={22} />
        ) : (
          <IoVolumeMediumSharp size={22} />
        )}
      </div>
      <div
        className={`w-[200px] absolute flex gap-1 mb-8 items-center p-2 transform -translate-x-1/2 -translate-y-full ${
          showRange ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 bg-black bg-opacity-30`}
      >
        <div onClick={toggleMute} className="cursor-pointer">
          {isMuted ? (
            <IoVolumeMute size={22} />
          ) : (
            <IoVolumeMediumSharp size={22} />
          )}
        </div>
        <div className="relative w-full">
          <div className="relative h-1 bg-white">
            <div
              className="absolute top-0 left-0 h-1 bg-gray-800"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div
            className="absolute top-1/2 transform -translate-y-1/2 left-0 -translate-x-1/2"
            style={{ left: `${percentage}%` }}
          >
            <div className="w-1.5 h-6 bg-gray-900 cursor-pointer shadow-lg" />
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={isMuted ? 0 : volume}
            onChange={(e) => onSoundChange(Number(e.target.value))}
            className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Sound;
