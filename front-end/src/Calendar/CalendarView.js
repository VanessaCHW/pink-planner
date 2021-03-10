import React from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import MyCalendar from "./MyCalendar";
import { Link } from "react-router-dom";

import AddEventIcon from "../Components/AddEventIcon";

const CalendarView = () => {
  return (
    <div>
      <Link to="/">Back</Link>
      <MyCalendar />
      <AddEventIcon />
    </div>
  );
};

export default CalendarView;
