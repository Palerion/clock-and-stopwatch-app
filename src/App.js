import React from "react";
import WorldClock from "./components/WorldClock";
import Stopwatch from "./components/Stopwatch";
import styled from "styled-components";

const AppContainer = styled.div`
  font-family: "Whitney", sans-serif;
  background-color: #f6f6f6;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #7289da;
  margin-bottom: 30px;
`;

const App = () => {
  return (
    <AppContainer>
      <Title>World Clock</Title>
      <WorldClock />
      <Title>Stopwatch</Title>
      <Stopwatch />
    </AppContainer>
  );
};

export default App;
