import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { COLORS } from "../Constants";
import { format } from "date-fns";

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
  const history = useHistory();
  const params = useParams();
  const today = new Date(
    params.date.slice(0, 4),
    params.date.slice(5, 7) - 1,
    params.date.slice(8, 10)
  );

  let colorIndex = 0;

  useEffect(() => {
    fetch(`/events/date/${params.date}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setDayEvents(res.data);
      })
      .catch((error) => console.log("error!", error));
  }, []);

  return (
    <Wrapper>
      <div onClick={() => history.goBack()}>Back</div>
      <Tabs>
        <TabItem
          onClick={() => history.push("/calendar-month")}
          style={{ backgroundColor: "#b5cdfd" }}
        >
          month
        </TabItem>
        <TabItem style={{ backgroundColor: "#b5cdfd" }}>week</TabItem>
        <TabItem
          onClick={() => history.push(`/date/${format(new Date(), "y-MM-dd")}`)}
        >
          Day
        </TabItem>
      </Tabs>
      <Header>
        <DateSection>
          <DateNumber>{format(today, "dd")}</DateNumber>
          <DateRightSection>
            <div>{format(today, "MMMM")}</div>
            <div>{format(today, "Y")}</div>
          </DateRightSection>
        </DateSection>
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
      <ContentSection>
        {dayEvents.map((dayEvent) => (
          <SingleEventBox>
            <div
              key={dayEvent.id_}
              style={{ backgroundColor: dayColors[colorIndex++] }}
            >
              {dayEvent.title}
            </div>
          </SingleEventBox>
        ))}
      </ContentSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
`;
const Header = styled.div`
  position: relative;
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
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

const DateSection = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  background: ${COLORS.gradientCalm};
  justify-content: center;
  padding-top: 20px;
`;
const DateNumber = styled.div`
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
`;
const Path = styled.path`
  fill: url(#gradient);
`;
const SingleEventBox = styled.div`
  border-radius: 5px;
  background-color: pink;
  margin: 6px;
`;
const ContentSection = styled.div`
  position: absolute;
  top: 200px;
  width: 100vw;
`;
export default DayView;
