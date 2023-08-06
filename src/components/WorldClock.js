import React, { useState, useEffect } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import styled from "styled-components";

const WorldClockContainer = styled.div`
  border: 1px solid #7289da;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WorldClock = () => {
  const [time, setTime] = useState(new Date());
  const [city, setCity] = useState("Local");

  const timeZones = {
    Local: Intl.DateTimeFormat().resolvedOptions().timeZone,
    "New York": "America/New_York",
    Toronto: "America/Toronto",
    "Buenos Aires": "America/Argentina/Buenos_Aires",
    Tokyo: "Asia/Tokyo",
    Shanghai: "Asia/Shanghai",
    Seoul: "Asia/Seoul",
    London: "Europe/London",
    Berlin: "Europe/Berlin",
    Sydney: "Australia/Sydney",
    Cairo: "Africa/Cairo",
    // ...add as many as you want
  };

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  let formattedTime;
  if (city === "Local") {
    formattedTime = format(time, "HH:mm:ss");
  } else {
    const zonedTime = utcToZonedTime(time, timeZones[city]);
    formattedTime = format(zonedTime, "HH:mm:ss", {
      timeZone: timeZones[city],
    });
  }

  return (
    <WorldClockContainer>
      <select onChange={handleCityChange} value={city}>
        {Object.keys(timeZones).map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div>{formattedTime}</div>
    </WorldClockContainer>
  );
};

export default WorldClock;
