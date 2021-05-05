import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { COLORS, dayColors } from "../Constants";
import { GrLocation } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

import NoEventToday from "./NoEventToday";
import NewEventDialog from "../Components/NewEventDialog";

import DateSection from "./DateSection";
import SingleEvent from "./SingleEvent";

const DayView = () => {
  const [dayEvents, setDayEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const history = useHistory();
  const params = useParams();
  const today = new Date(
    params.date.slice(0, 4),
    params.date.slice(5, 7) - 1,
    params.date.slice(8, 10)
  );

  useEffect(() => {
    setStatus("loading");
    fetch(`/events/date/${params.date}`)
      .then((res) => res.json())
      .then((res) => {
        setDayEvents(res.data);
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  }, [params]);

  const getDayEventsAfterDeleteAdd = async () => {
    setStatus("loading");
    await fetch(`/events/date/${params.date}`)
      .then((res) => res.json())
      .then((res) => {
        setDayEvents(res.data);
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  };

  return (
    <Wrapper>
      <NewEventDialog refreshEvents={getDayEventsAfterDeleteAdd} />
      <Tabs>
        <NavIcon>
          <AiOutlineHome onClick={() => history.push("/")} size={30} />
        </NavIcon>
        <NavIcon>
          <BiArrowBack onClick={() => history.goBack()} size={30} />
        </NavIcon>
        <TabItem
          onClick={() => history.push("/calendar-month")}
          style={{ backgroundColor: "#b5cdfd" }}
        >
          month
        </TabItem>
        <TabItem
          style={{ backgroundColor: "#b5cdfd" }}
          onClick={() => history.push(`/week/${params.date}`)}
        >
          week
        </TabItem>
        <TabItem>Day</TabItem>
      </Tabs>
      <DateSection today={today} />

      {status === "loading" ? null : (
        <ContentSection>
          {dayEvents.length === 0 ? (
            <NoEventToday />
          ) : (
            <>
              <SingleEvent
                dayEvents={dayEvents}
                refreshEvents={getDayEventsAfterDeleteAdd}
              />
            </>
          )}
        </ContentSection>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${COLORS.background};
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
  margin-right: 3px;
`;
const NavIcon = styled.div`
  padding: 0 5px;
  color: rgb(222, 87, 102);
  border: 1px solid rgb(222, 87, 102);
  border-radius: 4px;
  margin: 0 3px;
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

const ContentSection = styled.div`
  position: absolute;
  top: 200px;
  width: 100vw;
`;
export default DayView;
