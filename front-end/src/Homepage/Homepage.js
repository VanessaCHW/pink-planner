import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { COLORS } from "../Constants";
import { format } from "date-fns";
import { GoCalendar } from "react-icons/go";
import { BiCalendarWeek, BiTimer } from "react-icons/bi";
import { MdToday } from "react-icons/md";
import banner from "./banner.jpg";
import NewEventDialog from "../Components/NewEventDialog";

const Homepage = () => {
  const today = new Date();
  const history = useHistory();

  return (
    <Wrapper>
      <NewEventDialog />
      <Banner src={banner} />
      <Title>Pink Planner</Title>
      <div>
        <MainDate>{format(today, "EEEE, LLLL do")}</MainDate>
        <Welcome>Welcome, Vanessa C.</Welcome>
      </div>
      <ActionSec>
        <ActionIcon
          onClick={(ev) => {
            history.push(`/date/${format(today, "y-MM-dd")}`);
          }}
        >
          <MdToday size="90" color={`${COLORS.icon1}`} />
          <IconText>Today</IconText>
        </ActionIcon>
        <ActionIcon
          onClick={() => history.push(`/week/${format(today, "y-MM-dd")}`)}
        >
          <BiCalendarWeek size="90" color={`${COLORS.icon1}`} />
          <IconText>Week view</IconText>
        </ActionIcon>
        <ActionIcon onClick={() => history.push("/calendar-month")}>
          <GoCalendar size="90" color={`${COLORS.icon1}`} />
          <IconText>Month view</IconText>
        </ActionIcon>
        <ActionIcon>
          <BiTimer size="90" color={`${COLORS.icon1}`} />
          <IconText>Focus Mode</IconText>
        </ActionIcon>
      </ActionSec>
    </Wrapper>
  );
};

const IconText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: "Varela Round", sans-serif;
`;
const Wrapper = styled.div`
  background-color: ${COLORS.background};
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;
const Banner = styled.img`
  width: 100vw;
`;
const Title = styled.div`
  position: absolute;
  width: 98vw;
  top: 220px;
  font-size: 3rem;
  color: white;
  font-weight: 200;
  margin-right: 10px;
  text-align: right;
`;
const ActionSec = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 10px;
`;
const ActionIcon = styled.div`
  width: 44%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const MainDate = styled.div`
  font-size: 2rem;
  padding: 0px 20px;
  padding-top: 20px;
`;
const Welcome = styled.div`
  font-size: 1.2rem;
  padding: 0px 20px;
  color: #737373;
`;
export default Homepage;
