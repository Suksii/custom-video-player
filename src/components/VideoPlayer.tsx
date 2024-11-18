import { useRef, MouseEvent, useState, ChangeEvent } from "react";
import videoTest from "../assets/video-test.mp4";
import PlayPause from "./PlayPause";
import FullScreen from "./FullScreen";
import VideoControls from "./VideoControls";
import PlayPauseCentral from "./PlayPauseCentral";
import useVideoPlayer from "../hooks/useVideoPlayer";
import Rewind from "./Rewind";
import Sound from "./Sound";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const chooseVideoRef = useRef<HTMLInputElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const {
    isPlaying,
    isClicked,
    isFullScreen,
    duration,
    currentTime,
    volume,
    isMuted,
    handleSound,
    toggleMute,
    handleChange,
    handleFullScreen,
    handlePlayPause,
    goBackward,
    goForward,
  } = useVideoPlayer(videoRef);

  const handleChangeVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setSelectedVideo(videoURL);
    }
  };

  const handleChooseVideo = () => {
    chooseVideoRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="" onClick={handleChooseVideo}>
        <p className="bg-black py-2 px-4 text-white uppercase font-semibold rounded-sm tracking-wider cursor-pointer hover:bg-opacity-80 duration-300">Click here to choose video</p>
        <input
          type="file"
          onChange={handleChangeVideo}
          className="hidden"
          ref={chooseVideoRef}
        />
      </div>
      <div
        onDoubleClick={handleFullScreen}
        onClick={handlePlayPause}
        className="w-[95%] md:w-[800px] relative aspect-video group"
      >
        <video
          ref={videoRef}
          src={selectedVideo || videoTest}
          className="w-full h-full object-contain"
        ></video>
        <PlayPauseCentral
          isPlaying={isPlaying}
          isClicked={isClicked}
          isFullScreen={isFullScreen}
        />
        <div
          className={`absolute bg-black bottom-0 w-full flex items-center gap-4 p-2 group-hover:opacity-100 group-hover:bg-opacity-30 ${
            isPlaying ? "opacity-0 bg-opacity-0" : "opacity-100 bg-opacity-30"
          } transition-all duration-500 z-50`}
          onClick={(e: MouseEvent) => e.stopPropagation()}
        >
          <PlayPause isPlaying={isPlaying} onClick={handlePlayPause} />
          <Rewind goBackward={goBackward} goForward={goForward} />
          <VideoControls
            duration={duration}
            currentTime={currentTime}
            onTimeChange={handleChange}
          />
          <Sound
            volume={volume}
            isMuted={isMuted}
            onSoundChange={handleSound}
            toggleMute={toggleMute}
          />
          <FullScreen isFullScreen={isFullScreen} onClick={handleFullScreen} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
