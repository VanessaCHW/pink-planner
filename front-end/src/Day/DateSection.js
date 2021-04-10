import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { COLORS } from "../Constants";
import { format } from "date-fns";

const DateSection = ({ today }) => {
  let history = useHistory();

  const nextDay = () => {
    let nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    let nextDayString = format(nextDay, "y-MM-dd");
    history.push(`/date/${nextDayString}`);
  };
  const previousDay = () => {
    let nextDay = new Date();
    nextDay.setDate(today.getDate() - 1);
    let nextDayString = format(nextDay, "y-MM-dd");
    history.push(`/date/${nextDayString}`);
  };
  return (
    <Header>
      <DateDivSection>
        <Arrow onClick={(ev) => previousDay()}>{"‹"}</Arrow>
        <DateNumber>{format(today, "dd")}</DateNumber>
        <DateRightSection>
          <div className="right">{format(today, "MMMM")}</div>
          <div className="right">{format(today, "Y")}</div>
        </DateRightSection>
        <Arrow onClick={(ev) => nextDay()}>{"›"}</Arrow>
      </DateDivSection>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(152,182,252,1)" />
            <stop offset="100%" stopColor="rgba(109,231,244,1)" />
          </linearGradient>
        </defs>
        <Path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,96L48,106.7C96,117,192,139,288,149.3C384,160,480,160,576,154.7C672,149,768,139,864,112C960,85,1056,43,1152,48C1248,53,1344,107,1392,133.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></Path>
      </svg>
    </Header>
  );
};

const Header = styled.div`
  position: relative;
`;

const DateDivSection = styled.div`
  color: ${COLORS.text2};
  display: flex;
  flex-direction: row;
  background: ${COLORS.gradientCalm};
  justify-content: center;
  padding-top: 20px;
`;
const Arrow = styled.button`
  color: white;
  font-size: 3rem;
  padding: 0 30px;
  background-color: transparent;
  border: none;
  outline: none;
  &:active {
    outline: none;
  }
`;
const DateNumber = styled.div`
  color: ${COLORS.text2};
  font-size: 5rem;
  font-weight: 300;
  padding: 0 20px;
  border-right: solid 1px white;
  box-sizing: border-box;
  line-height: 4rem;
`;
const DateRightSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 1.5rem;
  padding: 0 20px;
  .right {
    color: ${COLORS.text2};
  }
`;
const Path = styled.path`
  fill: url(#gradient);
`;
export default DateSection;
