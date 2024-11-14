import { useRef, useState } from "react";
import videoTest from "../assets/video-test.mp4";
import { FaPlay, FaPause } from "react-icons/fa";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <div className="aspect-video w-[800px] relative">
      <video ref={videoRef} src={videoTest} width="100%" height="auto"></video>
      <div className="absolute h-8 bg-black bg-opacity-50 bottom-0 w-full px-4 flex items-center border-t border-black">
        <div onClick={handlePlayPause} className="text-gray-100 cursor-pointer">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
      </div>
    </div>
  );
};

export default Video;
