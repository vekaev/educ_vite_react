import React, { useRef, useState } from "react";
import "./index.css";

const padTime = (time) => time.toString().padStart(2, "0");

export function Pomodoro() {
  const [title, setTitle] = useState("Let the countdown begin!");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setTitle("You are doing great!");
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setIsRunning(false);
    setTitle("Keep it up!");
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setIsRunning(false);
    setTitle("Ready to another round?");

    setTimeLeft(25 * 60);
  };

  return (
    <div className="pomodoro">
      <h2>Pomodoro</h2>
      <h3>{title}</h3>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {timeLeft !== 25 * 60 && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
