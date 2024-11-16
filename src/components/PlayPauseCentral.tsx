import { IoMdPause, IoMdPlay } from "react-icons/io";

type PlayPauseCentralProps = {
  isFullScreen: boolean;
  isClicked: boolean;
  isPlaying: boolean;
};

function PlayPauseCentral({
  isFullScreen,
  isClicked,
  isPlaying,
}: PlayPauseCentralProps) {
  return (
    <div
      className={`absolute p-4 top-1/2 left-1/2 bg-black bg-opacity-30 rounded-full text-white ${
        isFullScreen ? "text-6xl" : "text-xl"
      } ${
        isClicked ? "scale-100 opacity-100" : "scale-50 opacity-0"
      } transition-all duration-500 -translate-x-1/2 -translate-y-1/2`}
    >
      {isPlaying ? <IoMdPause /> : <IoMdPlay />}
    </div>
  );
}

export default PlayPauseCentral;
