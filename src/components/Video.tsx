import { useEffect, useRef, useState } from "react";
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
      onClick={handlePlayPause}
      className={` ${
        isFullScreen
          ? "w-full h-screen bg-black bg-opacity-70"
          : "mx-auto w-[95%] md:w-[800px]"
      } relative aspect-video group`}
    >
      <video
        ref={videoRef}
        src={videoTest}
        className="w-full h-full object-contain"
      ></video>
      <div
        className={`absolute h-8 bg-black bottom-0 w-full flex items-center justify-between px-2 group-hover:opacity-30 ${
          isPlaying ? "opacity-0" : "opacity-30"
        } transition-opacity duration-500 z-50`}
      >
        <div
          onClick={handlePlayPause}
          className="text-gray-100 cursor-pointer z-50"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div onClick={handleFullScreen} className="text-white cursor-pointer">
          {isFullScreen ? (
            <MdOutlineFullscreenExit size={30} />
          ) : (
            <MdFullscreen size={30} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
