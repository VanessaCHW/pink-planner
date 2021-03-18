import React from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import MyCalendar from "./MyCalendar";
import { Link, useHistory } from "react-router-dom";

import AddEventIcon from "../Components/AddEventIcon";

const CalendarView = () => {
  const history = useHistory();
  return (
    <div>
      <Link onClick={() => history.goBack()}>Back</Link>
      <MyCalendar />
      <AddEventIcon />
    </div>
  );
};

export default CalendarView;
