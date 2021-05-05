import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { COLORS, dayColors } from "../Constants";
import { GrLocation } from "react-icons/gr";

import DeleteEventDialog from "../Components/DeleteEventDialog";
import EditEventDialog from "../Components/EditEventDialog";

const SingleEvent = ({ dayEvents, refreshEvents }) => {
  let colorIndex = 0;
  return (
    <>
      {dayEvents.map((dayEvent) => (
        <SingleEventBox>
          <TimeBox>
            {dayEvent.start.time.allday ? (
              <div>All day</div>
            ) : (
              <>
                <div style={{ fontWeight: "500" }}>
                  {dayEvent.start.time.hours}:{dayEvent.start.time.minutes}{" "}
                  {dayEvent.start.time.ap}
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
                  refreshEvents={refreshEvents}
                />
              </EventButtons>
              <EventButtons>
                <DeleteEventDialog
                  eventId={dayEvent._id}
                  refreshEvents={refreshEvents}
                />
              </EventButtons>
            </EventButtonBox>
          </div>
        </SingleEventBox>
      ))}
    </>
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
export default SingleEvent;
