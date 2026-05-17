import { useEffect } from "react";

export default function Timer({ isRunning, isLongTime, seconds, setSeconds, setIsLongTime }) {
  useEffect(() => {
    if (!isRunning) return;
    if (seconds <= -1) return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, seconds, setSeconds]);

  useEffect(() => {
    if (seconds !== -1) return;

    if (isLongTime) {
      setIsLongTime(false);
      setSeconds(Number(localStorage.getItem("shortTime")) || 300);
    } else {
      setIsLongTime(true);
      setSeconds(Number(localStorage.getItem("longTime")) || 3600);
    }
  }, [seconds, isLongTime, setIsLongTime, setSeconds]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center m-5 pr-5">
      <div className="flex flex-col"></div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": hours }} aria-live="polite">{hours}</span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": minutes }} aria-live="polite">{minutes}</span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": secs }} aria-live="polite">{secs}</span>
        </span>
        sec
      </div>
    </div>
  );
}