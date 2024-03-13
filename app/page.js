"use client";
import { useState } from "react";
import Polyrhythm from "@/components/Polyrhythm";

export default function Home() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(0); // Add this line

  const handleMinutesChange = (event) => {
    setMinutes(parseInt(event.target.value));
  };

  const handleSecondsChange = (event) => {
    setSeconds(parseInt(event.target.value));
  };

  const calculateSeconds = () => {
    const totalSeconds = minutes * 60 + seconds;
    setTimer(totalSeconds); // Update the timer state here
  };

  return (
    <main>
      <label htmlFor="minutes">Minutes:</label>
      <input
        type="number"
        id="minutes"
        value={minutes}
        onChange={handleMinutesChange}
      />
      <label htmlFor="seconds">Seconds:</label>
      <input
        type="number"
        id="seconds"
        value={seconds}
        onChange={handleSecondsChange}
      />
      <button onClick={calculateSeconds}>start</button>
      <Polyrhythm timer={timer} />
      <button onClick={() => setTimer(0)}>stop</button>
    </main>
  );
}
