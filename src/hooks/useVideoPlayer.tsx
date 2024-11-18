import { ChangeEvent, RefObject, useEffect, useState } from "react";

function useVideoPlayer(videoElement: RefObject<HTMLVideoElement>) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

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

  const goForward = () => {
    if (videoElement.current) {
      const newTime = Math.min(
        videoElement.current.currentTime + 30,
        videoElement.current.duration
      );
      videoElement.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const goBackward = () => {
    if (videoElement.current) {
      const newTime = Math.max(videoElement.current.currentTime - 30, 0);
      videoElement.current.currentTime = newTime;
      setCurrentTime(newTime);
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

  const handleSound = (newVolume: number) => {
    if (videoElement.current) {
      setVolume(newVolume);
      videoElement.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoElement.current) {
      const muted = !isMuted;
      setIsMuted(muted);
      videoElement.current.muted = muted;
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
    volume,
    isMuted,
    handlePlayPause,
    handleFullScreen,
    handleChange,
    handleSound,
    toggleMute,
    goForward,
    goBackward,
  };
}

export default useVideoPlayer;
