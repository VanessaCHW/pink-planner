import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "./Constants";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { RiNotification2Line } from "react-icons/ri";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import DateIcons from "./Homepage/DateIcon";

let initialEvent = {
  kind: "calendar-event",
  id: null,
  title: null,
  description: null,
  location: null,
  creator: {
    name: "Vanessa Chan",
  },
  start: {
    date: null,
    time: null,
  },
  end: {
    date: null,
    time: null,
  },
  reminders: [
    {
      method: null,
      minutes: null,
    },
  ],
};

const MeetingForm = () => {
  const history = useHistory();
  const [form, setForm] = useState(initialEvent);

  const getNewID = () => {
    return uuidv4();
  };

  /******************************* */
  /** Select start/end date Input fields */
  /******************************* */
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");

  const startField = () => {
    document.getElementById("CalendarFormStart").style.visibility = "visible";
  };
  const endField = () => {
    document.getElementById("CalendarFormEnd").style.visibility = "visible";
  };

  /******************************* */
  /**CALENDAR STATES AND FUNCTIONS */
  /******************************* */
  const [CalendarStartDate, setCalendarStartDate] = useState(new Date());
  const [CalendarEndDate, setCalendarEndDate] = useState(new Date());

  const onStartCalendarChange = (nextValue) => setCalendarStartDate(nextValue);
  const onEndCalendarChange = (nextValue) => setCalendarEndDate(nextValue);

  const selectStartDate = (value) => setCalendarStartDate(value); //Selecting date in calendar view
  const selectEndDate = (value) => setCalendarEndDate(value); //Selecting date in calendar view

  // OK button in the calendar view
  const submitStartDate = (event) => {
    event.preventDefault();
    document.getElementById("CalendarFormStart").style.visibility = "hidden";
    setEventStartDate(CalendarStartDate);

    let formatted = format(CalendarStartDate, "EEE. MMM. d, y");
    setDisplayStartDate(formatted);

    if (eventEndDate === "" || eventEndDate < CalendarStartDate) {
      setEventEndDate(CalendarStartDate);
      let formatted = format(CalendarStartDate, "EEE. MMM. d, y");
      setDisplayEndDate(formatted);
    }
  };
  const submitEndDate = (event) => {
    event.preventDefault();
    document.getElementById("CalendarFormEnd").style.visibility = "hidden";
    setEventEndDate(CalendarEndDate);
    let formatted = format(CalendarEndDate, "EEE. MMM. d, y");
    setDisplayEndDate(formatted);

    if (eventStartDate === "") {
      setEventStartDate(CalendarEndDate);
      let formatted = format(CalendarEndDate, "EEE. MMM. d, y");
      setDisplayStartDate(formatted);
    }
  };
  // CANCEL BUTTON
  const cancelStartDate = (event) => {
    event.preventDefault();
    document.getElementById("CalendarFormStart").style.visibility = "hidden";
  };
  const cancelEndDate = (event) => {
    event.preventDefault();
    document.getElementById("CalendarFormEnd").style.visibility = "hidden";
  };

  /**************************************** */
  const handleTitle = (value) => setForm({ ...form, title: value });
  const handleDescription = (value) => setForm({ ...form, description: value });
  const handleLocation = (value) => setForm({ ...form, location: value });

  return (
    <div>
      <div>
        <button onClick={() => history.goBack()}>x</button>
        <button>Create event</button>
      </div>
      <form>
        <Top>
          <Title
            type="text"
            placeholder="Your event title"
            onChange={(ev) => handleTitle(ev.target.value)}
          />
          <Description
            type="text"
            placeholder="What will happen?"
            onChange={(ev) => handleDescription(ev.target.value)}
          />
        </Top>
        <Section>
          <Label>Date</Label>
          <div className="dateInputSection">
            <InputBorder>
              <SectionInput
                readOnly
                placeholder="Start date"
                onClick={() => startField()}
                value={displayStartDate}
              />
              <FiCalendar color="#b3b3b3" />
            </InputBorder>
            <BsArrowRight />
            <InputBorder>
              <SectionInput
                placeholder="End date"
                onClick={() => endField()}
                value={displayEndDate}
              />
              <FiCalendar color="#b3b3b3" />
            </InputBorder>
          </div>

          <CalendarForm id="CalendarFormStart">
            <Calendar
              onChange={onStartCalendarChange}
              defaultView="month"
              value={CalendarStartDate}
              prev2Label={null}
              next2Label={null}
              onClickDay={(value, event) => selectStartDate(value, event)}
            />
            <div className="ButtonBox">
              <button onClick={(ev) => cancelStartDate(ev)}>Cancel</button>
              <button onClick={(event) => submitStartDate(event)}>Ok</button>
            </div>
          </CalendarForm>

          <CalendarForm id="CalendarFormEnd">
            <Calendar
              onChange={onEndCalendarChange}
              defaultView="month"
              value={CalendarEndDate}
              prev2Label={null}
              next2Label={null}
              onClickDay={(value, event) => selectEndDate(value, event)}
            />
            <div className="ButtonBox">
              <button onClick={(ev) => cancelEndDate(ev)}>Cancel</button>
              <button onClick={(event) => submitEndDate(event)}>Ok</button>
            </div>
          </CalendarForm>
        </Section>
        <Section>
          <Label>Time</Label>
          <TimeRange>
            <SectionInput3 id="startHour" type="text" placeholder="00" /> :{" "}
            <SectionInput3 id="startMin" type="text" placeholder="00" />{" "}
            <SectionInput3 id="startAMPM" type="text" placeholder="PM" />
            <Arrow>
              <BsArrowRight />
            </Arrow>
            <SectionInput3 id="endHour" type="text" placeholder="00" /> :{" "}
            <SectionInput3 id="endMin" type="text" placeholder="00" />{" "}
            <SectionInput3 id="endAMPM" type="text" placeholder="PM" />
          </TimeRange>
        </Section>
        <Section>
          <Label>Location</Label>
          <div>
            <GrLocation />
            <SectionInput2
              type="text"
              placeholder="Add location"
              onChange={(ev) => handleLocation(ev.target.value)}
            />
          </div>
        </Section>
        <Section>
          <Label>Notifications</Label>
          <RiNotification2Line />{" "}
          <SectionInput2 type="text" placeholder="Add notification" />
        </Section>
      </form>
    </div>
  );
};

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f6f7f6;
  padding-top: 50px;
  padding-bottom: 30px;
`;

const Title = styled.input`
  margin: 10px 0;
  width: 75vw;
  border: none;
  border-bottom: 2px solid black;
  padding-bottom: 5px;
  font-size: 1.5rem;
  font-weight: 500;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 50%;
    font-weight: 400;
  }
`;
const Description = styled.input`
  margin: 10px 0;
  width: 75vw;
  border: none;
  border-bottom: 1px solid #b3b3b3;
  padding-bottom: 5px;
  font-size: 1rem;
  background-color: transparent;

  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 60%;
  }
`;
const Section = styled.div`
  width: 100vw;
  box-sizing: border-box;
  border-top: 1px solid #b3b3b3;
  padding: 15px 20px;
  .dateInputSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Label = styled.label`
  padding-bottom: 10px;
  display: block;
`;

const InputBorder = styled.div`
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  display: inline-block;
  padding: 0 5px;
`;

const SectionInput = styled.input`
  padding: 5px 0;
  font-size: 1rem;
  width: 140px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 70%;
  }
`;

const SectionInput2 = styled.input`
  padding: 5px 0;
  font-size: 1rem;
  width: 300px;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 70%;
  }
`;

const SectionInput3 = styled.input`
  padding: 5px 0;
  font-size: 1rem;
  width: 25px;
  text-align: center;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 70%;
  }
  .AMPM {
    padding: 0 5px;
  }
`;
const CalendarForm = styled.div`
  padding: 0 6vw;
  height: 100vh;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  .ButtonBox {
    margin: 10px 0;
  }
`;

const TimeRange = styled.div`
  display: flex;
  align-items: center;
`;
const Arrow = styled.div`
  padding: 0 10px;
`;

export default MeetingForm;
