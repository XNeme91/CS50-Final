import { useEffect, useState } from "react";

let hours, minutes, seconds;

export default function Timer({isRunning, seconds, setSeconds}) {

  useEffect(() => {
	if (!isRunning) return;
	
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  hours = Math.floor(seconds / 3600);
  minutes = Math.floor((seconds % 3600) / 60);
  seconds = seconds % 60;


  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center m-5 pr-5">
  <div className="flex flex-col">
  </div>
  <div className="flex flex-col">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":hours} } aria-live="polite">10</span>
    </span>
    hours
  </div>
  <div className="flex flex-col">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":minutes} } aria-live="polite">24</span>
    </span>
    min
  </div>
  <div className="flex flex-col">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":seconds} } aria-live="polite">59</span>
    </span>
    sec
  </div>
</div>
  );
}