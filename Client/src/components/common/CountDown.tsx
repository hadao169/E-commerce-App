import Countdown from "react-countdown";
import { Timer } from "lucide-react";
type RendererProps = {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

const renderer = ({ hours, minutes, seconds, completed }: RendererProps) => {
  if (completed) {
    return <span>Time&apos;s up!</span>;
  } else {
    const pad = (n: number) => n.toString().padStart(2, "0");

    return (
      <span>
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    );
  }
};

export default function CountDownTimer({ date }: { date: number }) {
  return (
    <div className="flex items-center gap-2 text-[15px]">
      <Timer />
      <Countdown date={date} renderer={renderer} />
    </div>
  );
}
