import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";

const MyCalendar = () => {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <Wrapper>
      <Link to="/">Back</Link>
      <Calendar
        onChange={onChange}
        value={value}
        prev2Label={null}
        next2Label={null}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  background-color: ${COLORS.background};
  height: 100vh;

  .react-calendar {
    max-width: 100%;
    background: transparent;
    /*border: 1px solid #a0a096;*/
    /*font-family: Arial, Helvetica, sans-serif;*/
    line-height: 2em;
    text-align: center;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 400;
    font-size: 1em;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  .react-calendar button {
    border: 0;
    outline: none;
    background-color: ${COLORS.overlay1};
    font-size: 1em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 1.2em 0em;
  }
  .react-calendar__navigation {
    height: 40px;
    margin: 10px 0;
  }
  .react-calendar__navigation button {
    min-width: 40px;
    background: white;
    font-size: 1.2rem;
    padding: 0;
    margin: 0 3px;
    border: none;
    border-radius: 50px;
  }
`;

export default MyCalendar;
