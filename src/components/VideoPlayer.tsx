import { useRef, MouseEvent } from "react";
import videoTest from "../assets/video-test.mp4";
import PlayPause from "./PlayPause";
import FullScreen from "./FullScreen";
import VideoControls from "./VideoControls";
import PlayPauseCentral from "./PlayPauseCentral";
import useVideoPlayer from "../hooks/useVideoPlayer";
import Rewind from "./Rewind";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    isPlaying,
    isClicked,
    isFullScreen,
    duration,
    currentTime,
    handleChange,
    handleFullScreen,
    handlePlayPause,
    goBackward,
    goForward,
  } = useVideoPlayer(videoRef);

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
      <PlayPauseCentral
        isPlaying={isPlaying}
        isClicked={isClicked}
        isFullScreen={isFullScreen}
      />
      <div
        className={`absolute bg-black bottom-0 w-full flex items-center justify-between p-2 group-hover:opacity-100 group-hover:bg-opacity-30 ${
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
        <FullScreen isFullScreen={isFullScreen} onClick={handleFullScreen} />
      </div>
    </div>
  );
};

export default VideoPlayer;
