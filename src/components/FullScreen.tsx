import { MdFullscreen, MdOutlineFullscreenExit } from "react-icons/md";

type FullScreenButtonProps = {
  isFullScreen: boolean;
  onClick: () => void;
};

function FullScreen({ isFullScreen, onClick }: FullScreenButtonProps) {
  return (
    <div onClick={onClick} className="text-white cursor-pointer">
      {isFullScreen ? (
        <MdOutlineFullscreenExit size={30} />
      ) : (
        <MdFullscreen size={30} />
      )}
    </div>
  );
}

export default FullScreen;
