import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StopwatchContainer = styled.div`
  border: 1px solid #7289da;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 30px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Stopwatch = () => {
  const [centiseconds, setCentiseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);

  function toggle() {
    setIsActive(!isActive);
  }

  function lap() {
    setLaps([...laps, centiseconds]);
  }

  function reset() {
    setCentiseconds(0);
    setIsActive(false);
    setLaps([]);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setCentiseconds((centiseconds) => centiseconds + 1);
      }, 10);
    } else if (!isActive && centiseconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, centiseconds]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time - hours * 360000) / 6000);
    const seconds = ((time % 6000) / 100).toFixed(2);
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <StopwatchContainer>
      <div className="time">{formatTime(centiseconds)}</div>
      <button className={"start-stop"} onClick={toggle}>
        {isActive ? "Pause" : "Start"}
      </button>
      <button className={"lap"} onClick={lap}>
        Lap
      </button>
      <button className={"reset"} onClick={reset}>
        Reset
      </button>
      {laps.length > 0 && (
        <div className="laps">
          <h2>Laps</h2>
          {laps.map((lapTime, index) => (
            <div key={index}>
              Lap {index + 1}: {formatTime(lapTime)}
            </div>
          ))}
        </div>
      )}
    </StopwatchContainer>
  );
};

export default Stopwatch;
