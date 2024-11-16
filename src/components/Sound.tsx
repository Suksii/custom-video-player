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
      {showRange && (
        <div className="w-[200px] absolute flex gap-1 mb-8 items-center p-2 transform -translate-x-1/2 -translate-y-full bg-black bg-opacity-30">
          <div onClick={toggleMute} className="cursor-pointer">
            {isMuted ? (
              <IoVolumeMute size={22} />
            ) : (
              <IoVolumeMediumSharp size={22} />
            )}
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={isMuted ? 0 : volume}
            onChange={(e) => onSoundChange(Number(e.target.value))}
            className="cursor-pointer w-full"
          />
        </div>
      )}
    </div>
  );
}

export default Sound;
