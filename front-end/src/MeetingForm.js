import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS, HOURS, MINUTES } from "./Constants";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { RiNotification2Line } from "react-icons/ri";
import { BiTime } from "react-icons/bi";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

let initialEvent = {
  id_: uuidv4(),
  kind: "calendar-event",
  title: "",
  description: "",
  location: "",
  creator: {
    name: "Vanessa Chan",
    userId: "009",
  },
  start: {
    date: null,
    time: { hours: null, minutes: null, ap: null, allday: false },
  },
  end: {
    date: null,
    time: { hours: null, minutes: null, ap: null, allday: false },
  },
  reminders: [
    /* {
      method: null,
      minutes: null,
    },*/
  ],
};

const MeetingForm = () => {
  const history = useHistory();
  const [form, setForm] = useState(initialEvent);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (form.title != null && form.start.date != null) {
      if (form.start.time.allday === true) {
        setButtonDisabled(false);
      } else {
        if (
          form.start.time.hours != null &&
          form.start.time.minutes != null &&
          form.start.time.ap != null &&
          form.end.time.hours != null &&
          form.end.time.minutes != null &&
          form.end.time.ap != null
        ) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      }
    } else {
      setButtonDisabled(true);
    }
  }, [form]);

  const handleTitle = (value) => setForm({ ...form, title: value });
  const handleDescription = (value) => setForm({ ...form, description: value });
  const handleLocation = (value) => setForm({ ...form, location: value });

  const CreateEvent = (event) => {
    event.preventDefault();
    console.log(form);

    fetch("/newEvent", {
      method: "POST",
      body: JSON.stringify({ form }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log("error!", error));
  };

  /******************************* */
  /** Select start/end date Input fields */
  /******************************* */
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

  const selectStartDate = (value) => {
    setForm({ ...form, start: { ...form.start, date: value } });
    setCalendarStartDate(value);
  };
  const selectEndDate = (value) => {
    setForm({ ...form, end: { ...form.end, date: value } });
    setCalendarEndDate(value);
  };

  // OK button in the calendar view
  const submitStartDate = (event) => {
    event.preventDefault();
    document.getElementById("CalendarFormStart").style.visibility = "hidden";
    console.log("Calendar", CalendarStartDate);

    let formatted = format(CalendarStartDate, "EEE. MMM. d, y");
    setDisplayStartDate(formatted);
    if (form.end.date < CalendarStartDate) {
      setForm({ ...form, end: { ...form.end, date: CalendarStartDate } });
      let formatted = format(CalendarStartDate, "EEE. MMM. d, y");
      setDisplayEndDate(formatted);
    }
  };
  const submitEndDate = (event) => {
    event.preventDefault();
    document.getElementById("CalendarFormEnd").style.visibility = "hidden";
    let formatted = format(CalendarEndDate, "EEE. MMM. d, y");
    setDisplayEndDate(formatted);
    if (form.start.date > CalendarEndDate) {
      setForm({ ...form, start: { ...form.start, date: CalendarEndDate } });
      let formatted = format(CalendarEndDate, "EEE. MMM. d, y");
      setDisplayStartDate(formatted);
    }
  };

  /******************************************
   * TIME FIELD
   ******************************************/
  const onStartHourChange = (value) => {
    setForm({
      ...form,
      start: { ...form.start, time: { ...form.start.time, hours: value } },
    });
  };
  const onStartMinChange = (value) => {
    setForm({
      ...form,
      start: { ...form.start, time: { ...form.start.time, minutes: value } },
    });
  };
  const onStartAPChange = (value) => {
    setForm({
      ...form,
      start: { ...form.start, time: { ...form.start.time, ap: value } },
    });
  };
  const onEndHourChange = (value) => {
    setForm({
      ...form,
      end: { ...form.end, time: { ...form.end.time, hours: value } },
    });
  };
  const onEndMinChange = (value) => {
    setForm({
      ...form,
      end: { ...form.end, time: { ...form.end.time, minutes: value } },
    });
  };
  const onEndAPChange = (value) => {
    setForm({
      ...form,
      end: { ...form.end, time: { ...form.end.time, ap: value } },
    });
  };

  const allDaySelect = (checked) => {
    if (checked) {
      setForm({
        ...form,
        start: { ...form.start, time: { ...form.start.time, allday: true } },
        end: { ...form.end, time: { ...form.end.time, allday: true } },
      });
    } else {
      setForm({
        ...form,
        start: { ...form.start, time: { ...form.start.time, allday: false } },
        end: { ...form.end, time: { ...form.end.time, allday: false } },
      });
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => history.goBack()}>x</button>
        <button onClick={(ev) => CreateEvent(ev)} disabled={buttonDisabled}>
          Create event
        </button>
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
          <div className="dateNTimeInputSection">
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
              <button onClick={(event) => submitEndDate(event)}>Ok</button>
            </div>
          </CalendarForm>
        </Section>
        <Section>
          <TimeSection>
            <Label className="TimeLabel">Time</Label>{" "}
            <div className="AllDaySection">
              <input
                type="checkbox"
                className="checkBoxBox"
                onChange={(ev) => allDaySelect(ev.target.checked)}
              />
              <label>All-day</label>
            </div>
          </TimeSection>
          <TimeRange>
            <Select onChange={(ev) => onStartHourChange(ev.target.value)}>
              <option hidden></option>
              {HOURS.map((hour) => (
                <option>{hour}</option>
              ))}
            </Select>
            :
            <Select onChange={(ev) => onStartMinChange(ev.target.value)}>
              <option hidden></option>
              {MINUTES.map((min) => (
                <option>{min}</option>
              ))}
            </Select>
            <Select onChange={(ev) => onStartAPChange(ev.target.value)}>
              <option hidden></option>
              <option>AM</option>
              <option>PM</option>
            </Select>
            <Arrow>
              <BsArrowRight />
            </Arrow>
            <Select onChange={(ev) => onEndHourChange(ev.target.value)}>
              <option hidden></option>
              {HOURS.map((hour) => (
                <option>{hour}</option>
              ))}
            </Select>
            :
            <Select onChange={(ev) => onEndMinChange(ev.target.value)}>
              <option hidden></option>
              {MINUTES.map((min) => (
                <option>{min}</option>
              ))}
            </Select>
            <Select onChange={(ev) => onEndAPChange(ev.target.value)}>
              <option hidden></option>
              <option>AM</option>
              <option>PM</option>
            </Select>
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
  .dateNTimeInputSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Label = styled.label`
  padding-bottom: 10px;
  display: block;
  font-size: 1.2rem;
`;

const TimeSection = styled.div`
  display: flex;
  justify-content: space-between;
  .TimeLabel {
    display: inline-block;
  }
  .AllDaySection {
    font-size: 1.2rem;
  }
  .checkBoxBox {
    margin: 0 5px;
  }
`;

const InputBorder = styled.div`
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  display: inline-block;
  padding: 0 5px;
  align-items: center;
  display: flex;
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

const Select = styled.select`
  appearance: none;
  padding: 1px 6px;
  margin: 0 2px;
  font-size: 1.1rem;
  border: none;
  background-color: #f2f2f2;
`;

export default MeetingForm;
