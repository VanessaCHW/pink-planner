import React from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import { GoCalendar } from "react-icons/go";
import { format } from "date-fns";

const DateIcons = ({ today }) => {
  return (
    <Wrapper>
      <Date>
        <div>{format(today, "EEEE").toLowerCase()}</div>
        <div className="number">{format(today, "d")}</div>
        <div>{format(today, "MMMM").toLowerCase()}</div>
      </Date>
      <Calendar>
        <div className="calendarText">calendar</div>
        <GoCalendar size="90" color={`${COLORS.icon1}`} />
      </Calendar>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  /*box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);*/
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const Date = styled.div`
  background: ${COLORS.gradientTranquil};
  color: ${COLORS.text2};
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 1.3rem;
  .number {
    font-size: 4rem;
    line-height: 4rem;
    padding: 0px 20px;
  }
`;
const Calendar = styled.div`
  background-color: ${COLORS.overlay1};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  text-align: right;
  padding: 0px 20px;
  .calendarText {
    font-weight: 300;
    font-size: 1.6rem;
    flex-grow: 1;
    text-align: center;
  }
`;

export default DateIcons;
