import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "./Constants";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

const MeetingForm = () => {
  /******************************* */
  /** Select start/end date Input fields */
  /******************************* */
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");

  const handleSelectDateField = () => {
    document.getElementById("CalendarForm").style.visibility = "visible";
  };

  /******************************* */
  /**CALENDAR STATES AND FUNCTIONS */
  /******************************* */
  const [CalendarStartDate, setCalendarStartDate] = useState(new Date());

  function onCalendarChange(nextValue) {
    setCalendarStartDate(nextValue);
  }

  //Selecting date in calendar view
  const handleClickDate = (value) => {
    setCalendarStartDate(value);
  };

  // OK button in the calendar view
  const handleSubmitDate = (event) => {
    event.preventDefault();
    document.getElementById("CalendarForm").style.visibility = "hidden";
    setEventStartDate(CalendarStartDate);
    let formatted = format(CalendarStartDate, "EEE. MMM. d, y");
    setDisplayStartDate(formatted);
  };

  const handleCancelSubmitDate = (event) => {
    event.preventDefault();
    document.getElementById("CalendarForm").style.visibility = "hidden";
  };

  return (
    <div>
      <div>
        <button>x</button>
        <button>Create event</button>
      </div>
      <form>
        <Top>
          <Title type="text" placeholder="Your event title" />
          <Description type="text" placeholder="What will happen?" />
        </Top>
        <Section>
          <Label>Date</Label>
          <div className="dateInputSection">
            <InputBorder>
              <SectionInput
                readOnly
                placeholder="Start date"
                onClick={() => handleSelectDateField()}
                value={displayStartDate}
              />
              <FiCalendar color="#b3b3b3" />
            </InputBorder>
            <BsArrowRight />
            <InputBorder>
              <SectionInput
                placeholder="End date"
                onClick={() => handleSelectDateField()}
                value={displayStartDate}
              />
              <FiCalendar color="#b3b3b3" />
            </InputBorder>
          </div>
          <CalendarForm id="CalendarForm">
            <Calendar
              onChange={onCalendarChange}
              defaultView="month"
              value={CalendarStartDate}
              prev2Label={null}
              next2Label={null}
              onClickDay={(value, event) => handleClickDate(value, event)}
            />
            <div className="ButtonBox">
              <button onClick={(ev) => handleCancelSubmitDate(ev)}>
                Cancel
              </button>
              <button onClick={(event) => handleSubmitDate(event)}>Ok</button>
            </div>
          </CalendarForm>
        </Section>
        <Section>
          <Label>Time</Label>
          <SectionInput type="text" />
          <div>Icon</div>
        </Section>
        <Section>
          <Label>Location</Label>
          <div>
            <SectionInput type="text" />
            <div>Icon</div>
          </div>
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
  &:focus {
    outline: none;
  }
  width: 140px;
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
export default MeetingForm;
