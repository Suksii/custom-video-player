import { useRef, useState } from "react";
import videoTest from "../assets/video-test.mp4";
import { MdFullscreen, MdOutlineFullscreenExit } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };
  return (
    <div
      onDoubleClick={handleFullScreen}
      className={` ${
        isFullScreen ? "w-full h-screen bg-black bg-opacity-70" : "w-[800px]"
      } relative aspect-video`}
    >
      <video
        ref={videoRef}
        src={videoTest}
        className="w-full h-full object-contain"
      ></video>
      <div className="absolute h-8 bg-black bg-opacity-50 bottom-0 w-full px-4 flex items-center justify-between">
        <div onClick={handlePlayPause} className="text-gray-100 cursor-pointer">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div
          onClick={handleFullScreen}
          className="text-gray-100 cursor-pointer"
        >
          {isFullScreen ? <MdOutlineFullscreenExit /> : <MdFullscreen />}
        </div>
      </div>
    </div>
  );
};

export default Video;
