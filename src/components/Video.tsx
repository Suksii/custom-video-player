import videoTest from "../assets/video-test.mp4";

const Video = () => {
  return (
    <div className="container">
      <video src={videoTest} controls width="100%" height="auto"></video>
    </div>
  );
};

export default Video;
