import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import MyCalendar from "./MyCalendar";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

import AddEventIcon from "../Components/AddEventIcon";

const dateColors = [
  "rgb(252,92,99)",
  "rgb(222,87,102)",
  "rgb(150,71,120)",
  "rgb(115,64,129)",
  "rgb(81,57,137)",
  "rgb(48,49,145)",
  "rgb(252,92,99)",
  "rgb(222,87,102)",
  "rgb(150,71,120)",
  "rgb(115,64,129)",
  "rgb(81,57,137)",
  "rgb(48,49,145)",
  "rgb(252,92,99)",
  "rgb(222,87,102)",
  "rgb(150,71,120)",
  "rgb(115,64,129)",
  "rgb(81,57,137)",
  "rgb(48,49,145)",
];

const CalendarView = () => {
  const history = useHistory();
  const [status, setStatus] = useState("loading");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [MonthEvents, setMonthEvents] = useState([]);

  // Handle function to pass to MyCalendar
  const updateCurrentMonth = (month) => setCurrentMonth(month);

  useEffect(() => {
    setStatus("loading");
    fetch(`/events/month/${currentMonth}`)
      .then((res) => res.json())
      .then((res) => {
        setMonthEvents(res.data);
        console.log(res);
        console.log(res.data);
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  }, [currentMonth]);

  let colorIndex = -1;

  return (
    <Wrapper>
      <div onClick={() => history.push("/")}>Home</div>
      <div onClick={() => history.goBack()}>Back</div>
      <Tabs>
        <TabItem onClick={() => history.push("/calendar-month")}>month</TabItem>
        <TabItem style={{ backgroundColor: "#b5cdfd" }}>week</TabItem>
        <TabItem
          style={{ backgroundColor: "#b5cdfd" }}
          onClick={() => history.push(`/date/${format(new Date(), "y-MM-dd")}`)}
        >
          Day
        </TabItem>
      </Tabs>
      <MyCalendar updateCurrentMonth={updateCurrentMonth} />

      {status === "loading" ? (
        <div>Loading</div>
      ) : (
        <>
          {MonthEvents.length === 0 ? (
            <NoEventsSection>
              <p>You have no upcoming events. </p>
              <p>Start planning your month now!</p>
              <AddEventButton>Add new event</AddEventButton>
              <AddEventImg src="Startup.png" alt="Add fun activities" />
            </NoEventsSection>
          ) : null}
          <EventsSection>
            {MonthEvents.map((ev) => (
              <EventBox
                onClick={() =>
                  history.push(`/date/${format(new Date(ev.date), "y-MM-dd")}`)
                }
              >
                <DateBox style={{ background: dateColors[++colorIndex] }}>
                  <div className="dayName">
                    {format(new Date(ev.date), "EEE.")}
                  </div>
                  <div>{format(new Date(ev.date), "d")}</div>
                </DateBox>
                <DayEventsBox>
                  {ev.events.map((meeting) => (
                    <div>
                      <EventTitle style={{ color: dateColors[colorIndex] }}>
                        {meeting.title}
                      </EventTitle>
                    </div>
                  ))}
                </DayEventsBox>
              </EventBox>
            ))}
          </EventsSection>
        </>
      )}

      <AddEventIcon />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
`;
const TabItem = styled.div`
  flex-grow: 1;
  text-align: center;
  background-color: rgb(150, 184, 252);
  border: 1px solid #cedefd;
  color: white;
  text-transform: uppercase;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
  padding: 6px 0;
  font-size: 1.2rem;
`;
const NoEventsSection = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AddEventImg = styled.img`
  max-width: 70vw;
  padding-bottom: 20px;
`;
const AddEventButton = styled.button`
  font-size: 1.3rem;
  margin-top: 15px;
  margin-bottom: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid pink;
`;
const EventsSection = styled.div``;

const EventBox = styled.div`
  display: flex;
  border: none;
`;
const DateBox = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${COLORS.text2};
  font-size: 2rem;
  min-width: 100px;
  min-height: 100px;

  .dayName {
    font-size: 1rem;
    line-height: 1rem;
  }
`;

const DayEventsBox = styled.div`
  background-color: ${COLORS.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #dae2f1;
`;

const EventTitle = styled.div`
  padding-left: 15px;
  font-size: 1.4rem;
`;
export default CalendarView;
