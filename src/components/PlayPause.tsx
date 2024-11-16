import { IoMdPause, IoMdPlay } from "react-icons/io";

type PlayPauseButtonProps = {
  isPlaying: boolean;
  onClick: () => void;
};

function PlayPause({
  isPlaying,
  onClick,
}: PlayPauseButtonProps) {
  return (
    <div onClick={onClick} className="text-gray-100 cursor-pointer z-50 pr-4">
      {isPlaying ? <IoMdPause size={20} /> : <IoMdPlay size={20} />}
    </div>
  );
}

export default PlayPause;
