import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { COLORS } from "../Constants";
import NewEventDialog from "../Components/NewEventDialog";

const Focus = () => {
  const [task_time, setTaskTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  return (
    <div>
      <NewEventDialog />
      <div>Focus</div>
      <div></div>
    </div>
  );
};

export default Focus;
