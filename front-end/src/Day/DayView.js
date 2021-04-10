import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { COLORS } from "../Constants";
import { GrLocation } from "react-icons/gr";
import NoEventToday from "./NoEventToday";
import { AiOutlineHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import NewEventDialog from "../Components/NewEventDialog";
import DeleteEventDialog from "../Components/DeleteEventDialog";
import EditEventDialog from "../Components/EditEventDialog";
import LoadingIcon from "../Components/LoadingIcon";
import DateSection from "./DateSection";

const dayColors = [
  "rgb(254,182,185)",
  "rgb(250,228,217)",
  "rgb(187,222,215)",
  "rgb(97,191,191)",
  "rgb(254,182,185)",
  "rgb(250,228,217)",
  "rgb(187,222,215)",
  "rgb(97,191,191)",
  "rgb(254,182,185)",
  "rgb(250,228,217)",
  "rgb(187,222,215)",
  "rgb(97,191,191)",
];

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

  let colorIndex = 0;

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
              {dayEvents.map((dayEvent) => (
                <SingleEventBox>
                  <TimeBox>
                    {dayEvent.start.time.allday ? (
                      <div>All day</div>
                    ) : (
                      <>
                        <div style={{ fontWeight: "500" }}>
                          {dayEvent.start.time.hours}:
                          {dayEvent.start.time.minutes} {dayEvent.start.time.ap}
                        </div>
                        <div style={{ fontWeight: "300" }}>
                          {dayEvent.end.time.hours}:{dayEvent.end.time.minutes}{" "}
                          {dayEvent.end.time.ap}
                        </div>
                      </>
                    )}
                  </TimeBox>
                  <div className="RightBox">
                    <EventContentBox
                      style={{
                        borderLeft: `5px solid ${dayColors[colorIndex++]}`,
                      }}
                    >
                      <div className="nameNdesc">
                        <EventTitle>{dayEvent.title}</EventTitle>
                        {dayEvent.description ? (
                          <EventDescr>{dayEvent.description}</EventDescr>
                        ) : null}
                      </div>
                      {dayEvent.location ? (
                        <EventLocation>
                          <GrLocation size="13" /> {dayEvent.location}
                        </EventLocation>
                      ) : null}
                    </EventContentBox>

                    <EventButtonBox>
                      <EventButtons>
                        <EditEventDialog
                          currentEvent={dayEvent}
                          refreshEvents={getDayEventsAfterDeleteAdd}
                        />
                      </EventButtons>
                      <EventButtons>
                        <DeleteEventDialog
                          eventId={dayEvent._id}
                          refreshEvents={getDayEventsAfterDeleteAdd}
                        />
                      </EventButtons>
                    </EventButtonBox>
                  </div>
                </SingleEventBox>
              ))}
            </>
          )}
        </ContentSection>
      )}
    </Wrapper>
  );
};

const SingleEventBox = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #dae2f1;
  font-weight: 300;
  padding: 15px 0;
  .nameNdesc {
    padding-bottom: 6px;
  }
  .RightBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
const TimeBox = styled.div`
  padding-left: 10px;
  min-width: 75px;
  font-size: 0.9rem;
`;
const EventContentBox = styled.div`
  padding-left: 15px;
  padding-right: 5px;
`;
const EventTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;
const EventDescr = styled.div`
  font-size: 1rem;
  padding-top: 4px;
`;
const EventLocation = styled.div`
  font-size: 0.95rem;
`;
const EventButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
`;
const EventButtons = styled.div`
  background: transparent;
  border: none;
  font-size: 1.3rem;
  opacity: 30%;
  display: block;
  padding: 3px 5px;
`;
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
