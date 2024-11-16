import { ChangeEvent, RefObject, useEffect, useState } from "react";

function useVideoPlayer(videoElement: RefObject<HTMLVideoElement>) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const handleDuration = () => {
      if (videoElement.current) {
        setDuration(videoElement.current.duration);
      }
    };

    const handleTime = () => {
      if (videoElement.current) {
        setCurrentTime(videoElement.current.currentTime);
      }
    };

    if (videoElement.current) {
      videoElement.current.addEventListener("loadedmetadata", handleDuration);
      videoElement.current.addEventListener("timeupdate", handleTime);
    }
    return () => {
      if (videoElement.current) {
        videoElement.current.removeEventListener(
          "loadedmetadata",
          handleDuration
        );
        videoElement.current.removeEventListener("timeupdate", handleTime);
      }
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (videoElement.current) {
      videoElement.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  const handlePlayPause = () => {
    if (videoElement.current) {
      isPlaying ? videoElement.current.pause() : videoElement.current.play();

      setIsPlaying((prev) => !prev);
      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
      }, 600);
    }
  };

  const handleFullScreen = () => {
    if (!isFullScreen && videoElement.current?.parentElement) {
      videoElement.current.parentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullScreen((prev) => !prev);
  };

  return {
    isClicked,
    duration,
    isPlaying,
    isFullScreen,
    currentTime,
    handlePlayPause,
    handleFullScreen,
    handleChange,
  };
}

export default useVideoPlayer;
