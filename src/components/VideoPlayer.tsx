import { useRef, useState, MouseEvent, useEffect, ChangeEvent } from "react";
import videoTest from "../assets/video-test.mp4";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import PlayPause from "./PlayPause";
import FullScreen from "./FullScreen";

const VideoPlayer = () => {
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
        videoRef.current.removeEventListener("timeupdate", handleTime);
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
    if (!isFullScreen && videoRef.current?.parentElement) {
      videoRef.current.parentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullScreen((prev) => !prev);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      onDoubleClick={handleFullScreen}
      onClick={handlePlayPause}
      className="w-[95%] md:w-[800px] relative aspect-video group"
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
        className={`absolute bg-black bottom-0 w-full flex items-center justify-between p-2 group-hover:opacity-100 group-hover:bg-opacity-30 ${
          isPlaying ? "opacity-0 bg-opacity-0" : "opacity-100 bg-opacity-30"
        } transition-all duration-500 z-50`}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <PlayPause isPlaying={isPlaying} onClick={handlePlayPause} />

        <div className="flex gap-4 items-center w-full px-8 text-white">
          <p>{formatTime(currentTime)}</p>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleChange}
            className="w-full cursor-pointer"
          />
          <p>{formatTime(duration - currentTime)}</p>
        </div>
        <FullScreen isFullScreen={isFullScreen} onClick={handleFullScreen} />
      </div>
    </div>
  );
};

export default VideoPlayer;
