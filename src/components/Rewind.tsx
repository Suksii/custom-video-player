import { TbRewindBackward30, TbRewindForward30 } from "react-icons/tb";

type RewindProps = {
  goBackward: () => void;
  goForward: () => void;
};

function Rewind({ goBackward, goForward }: RewindProps) {
  return (
    <div className="flex items-center gap-2 text-white">
      <TbRewindBackward30
        size={22}
        className="cursor-pointer"
        onClick={goBackward}
      />
      <TbRewindForward30
        size={22}
        className="cursor-pointer"
        onClick={goForward}
      />
    </div>
  );
}

export default Rewind;
