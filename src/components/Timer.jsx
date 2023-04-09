import React, { useState, useEffect } from "react";

function Timer({ condition }) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [continueTimer, setContinueTimer] = useState(true);

  useEffect(() => {
    if (!continueTimer) {
      return;
    }

    const interval = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [continueTimer]);

  useEffect(() => {
    if (condition) {
      setContinueTimer(false);
    }
  }, [condition]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Time elapsed: {formatTime(timeElapsed)}</h2>
    </div>
  );
}

export default Timer;
