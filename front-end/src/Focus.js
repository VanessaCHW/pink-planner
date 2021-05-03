import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import NewEventDialog from "./Components/NewEventDialog";

const Focus = () => {
  const [task_time, setTaskTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  return (
    <Wrapper>
      <div>Focus</div>
      <div>
        {" "}
        <CircleContainer>
          <Circle r="18" cx="20" cy="20"></Circle>
        </CircleContainer>
      </div>

      <NewEventDialog />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #333;
`;
const countdown = keyframes`
from { stroke-dashoffset: 0px}
to{stroke-dashoffset: 113px}
`;

const CircleContainer = styled.svg`
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);

  stroke-dasharray: 113px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: white;
  fill: none;
  animation: countdown 10s linear infinite forwards;
`;

const Circle = styled.circle`
  stroke-dasharray: 113px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: white;
  fill: none;
  animation: ${countdown} 10s linear infinite forwards;
`;

export default Focus;
