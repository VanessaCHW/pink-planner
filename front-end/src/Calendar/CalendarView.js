import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { COLORS, dateColors } from "../Constants";
import MyCalendar from "./MyCalendar";
import NewEventDialog from "../Components/NewEventDialog";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { AiOutlineHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import noEventToday from "./img.png";

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
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  }, [currentMonth]);

  let colorIndex = -1;

  const getEventsAfterCreate = async () => {
    setStatus("loading");

    await fetch(`/events/month/${currentMonth}`)
      .then((res) => res.json())
      .then((res) => {
        setMonthEvents(res.data);
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  };

  return (
    <Wrapper>
      <NewEventDialog refreshEvents={getEventsAfterCreate} />

      <Tabs>
        <NavIcon>
          <AiOutlineHome onClick={() => history.push("/")} size={30} />
        </NavIcon>
        <NavIcon>
          <BiArrowBack onClick={() => history.goBack()} size={30} />
        </NavIcon>
        <TabItem onClick={() => history.push("/calendar-month")}>month</TabItem>
        <TabItem
          onClick={() => history.push(`/week/${format(new Date(), "y-MM-dd")}`)}
          style={{ backgroundColor: "#b5cdfd" }}
        >
          week
        </TabItem>
        <TabItem
          style={{ backgroundColor: "#b5cdfd" }}
          onClick={() => history.push(`/date/${format(new Date(), "y-MM-dd")}`)}
        >
          Day
        </TabItem>
      </Tabs>
      <MyCalendar updateCurrentMonth={updateCurrentMonth} />

      {status === "loading" ? null : (
        <>
          {MonthEvents.length === 0 ? (
            <NoEventsSection>
              <p>You have nothing planned!</p>
              <p>Tap " + " to add a task.</p>
              <AddEventImg src={noEventToday} alt="Add fun activities" />
            </NoEventsSection>
          ) : null}
          <EventsSection>
            {MonthEvents.map((ev) => (
              <EventBox
                onClick={() =>
                  history.push(`/date/${format(new Date(ev.date), "y-MM-dd")}`)
                }
              >
                <DateBox style={{ backgroundColor: dateColors[++colorIndex] }}>
                  <div className="dayName">
                    {format(new Date(ev.date), "EEE.")}
                  </div>
                  <div className="dayNum">{format(new Date(ev.date), "d")}</div>
                </DateBox>
                <DayEventsBox>
                  {ev.events.map((meeting) => (
                    <div>
                      <EventTitle style={{ color: dateColors[colorIndex] }}>
                        {"‣ "}
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
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
`;
const NavIcon = styled.div`
  padding: 0 5px;
  color: rgb(222, 87, 102);
  border: 1px solid rgb(222, 87, 102);
  border-radius: 4px;
  margin: 0 3px;
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
  margin-right: 3px;
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
  max-width: 90vw;
`;

const EventsSection = styled.div``;
const slideUpAnimation = keyframes`
    from {
    margin-top: 100%;
    opacity: 0;
  }
  to {
    margin-top: 0%;
    opacity:0.4;
  }
`;
const EventBox = styled.div`
  display: flex;
  border: none;
  animation: ${slideUpAnimation} 0.3s;
`;
const DateBox = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  min-width: 100px;
  min-height: 100px;

  .dayName {
    color: ${COLORS.text2};
    font-size: 1rem;
    line-height: 1rem;
  }
  .dayNum {
    color: ${COLORS.text2};
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
