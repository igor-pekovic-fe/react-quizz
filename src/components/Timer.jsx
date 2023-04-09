import React, { useState, useEffect } from "react";

function Timer({
  condition,
  timeElapsed,
  continueTimer,
  setTimeElapsed,
  setContinueTimer,
}) {
  useEffect(() => {
    if (!continueTimer) return;

    const interval = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [continueTimer]);

  useEffect(() => {
    if (condition) setContinueTimer(false);
  }, [condition]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <h2>Time elapsed: {formatTime(timeElapsed)}</h2>;
}

export default Timer;
