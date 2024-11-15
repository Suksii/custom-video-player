import { useRef, useState, MouseEvent, useEffect, ChangeEvent } from "react";
import videoTest from "../assets/video-test.mp4";
import { MdFullscreen, MdOutlineFullscreenExit } from "react-icons/md";
import { IoMdPlay, IoMdPause } from "react-icons/io";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const handleDuration = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    const handleTime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleDuration);
      videoRef.current.addEventListener("timeupdate", handleTime);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", handleDuration);
        videoRef.current.addEventListener("timeupdate", handleTime);
      }
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();

      setIsPlaying((prev) => !prev);
      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
      }, 600);
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
        className={`absolute p-4 top-1/2 left-1/2 bg-black bg-opacity-30 rounded-full text-white ${
          isFullScreen ? "text-6xl" : "text-xl"
        } ${
          isClicked ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } transition-all duration-500 -translate-x-1/2 -translate-y-1/2`}
      >
        {isPlaying ? <IoMdPause /> : <IoMdPlay />}
      </div>
      <div
        className={`absolute bg-black bottom-0 w-full flex items-center justify-between p-2 group-hover:opacity-30 ${
          isPlaying ? "opacity-0" : "opacity-30"
        } transition-opacity duration-500 z-50`}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <div
          onClick={handlePlayPause}
          className="text-gray-100 cursor-pointer z-50"
        >
          {isPlaying ? <IoMdPause size={20} /> : <IoMdPlay size={20} />}
        </div>

        <div className="flex gap-4 items-center text-white">
          <p>{currentTime}</p>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleChange}
          />
          <p>{duration - currentTime}</p>
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
