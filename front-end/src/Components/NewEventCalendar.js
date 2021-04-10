import React from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import Calendar from "react-calendar";

const NewEventCalendar = ({ onChange, value, onClickDay }) => {
  return (
    <Wrapper>
      <Calendar
        onChange={onChange}
        defaultView="month"
        value={value}
        prev2Label={null}
        next2Label={null}
        onClickDay={onClickDay}
      />
    </Wrapper>
  );
};

export default NewEventCalendar;

const Wrapper = styled.div`
  z-index: 10;
  .react-calendar {
    max-width: 100%;
    background: white;
    line-height: 2em;
    text-align: center;
  }
  .react-calendar button {
    border: none;
    outline: none;
    font-size: 1.3rem;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #c1c7c3;
  }
  .react-calendar__tile--active {
    background: rgb(97, 191, 191);
    color: white;
  }
`;
