import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import MyCalendar from "./MyCalendar";
import { Link, useHistory } from "react-router-dom";
import { format } from "date-fns";

import AddEventIcon from "../Components/AddEventIcon";

const CalendarView = () => {
  const history = useHistory();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [MonthEvents, setMonthEvents] = useState([]);

  // Handle function to pass to MyCalendar
  const updateCurrentMonth = (month) => setCurrentMonth(month);

  useEffect(() => {
    fetch(`/events/month/${currentMonth}`)
      .then((res) => res.json())
      .then((res) => {
        setMonthEvents(res.data);
        console.log(res);
      })
      .catch((error) => console.log("error!", error));
  }, [currentMonth]);

  return (
    <div>
      <div onClick={() => history.goBack()}>Back</div>
      <MyCalendar updateCurrentMonth={updateCurrentMonth} />
      <div>
        <div>This month's events</div>

        {MonthEvents.map((ev) => (
          <EventBox>
            <DateBox>
              <div className="dayName">
                {format(new Date(ev.start.date), "EEE.")}
              </div>
              <div>{format(new Date(ev.start.date), "d")}</div>
            </DateBox>
            <div>{ev.title}</div>
          </EventBox>
        ))}
      </div>
      <AddEventIcon />
    </div>
  );
};
const EventBox = styled.div`
  margin-left: 50px;
  border-left: 1px solid black;
  position: relative;
  height: 100px;
`;
const DateBox = styled.div`
  background: white;
  position: absolute;
  border-radius: 50px;
  border: 1px solid pink;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: -30px;
  font-size: 1.5rem;
  line-height: 1.4rem;

  .dayName {
    font-size: 1.1rem;
    line-height: 1.4rem;
  }
`;
export default CalendarView;
