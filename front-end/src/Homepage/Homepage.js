import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { COLORS } from "../Constants";
import { format } from "date-fns";
import { GoCalendar } from "react-icons/go";
import { BiCalendarWeek, BiTimer } from "react-icons/bi";
import { MdToday } from "react-icons/md";
import NewsFeed from "./NewsFeed";
import plannerLogo from "./planner_logo.png";
import NewEventDialog from "../Components/NewEventDialog";
import rapidKey from "./key";
const Homepage = () => {
  const today = new Date();
  const history = useHistory();

  const [dayEvents, setDayEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  //const [articles, setArticles] = useState([]);

  useEffect(() => {
    setStatus("loading");
    fetch(`/events/date/${format(today, "yyyy-MM-dd")}`)
      .then((res) => res.json())
      .then((res) => {
        setDayEvents(res.data);
        console.log(res.data);
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  }, []);

  /*useEffect(() => {
    fetch(
      "https://google-news.p.rapidapi.com/v1/geo_headlines?lang=en&country=CA&geo=Montreal",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            rapidKey,
          "x-rapidapi-host": "google-news.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setArticles(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);*/

  let greeting = "";
  if (today.getHours() < 12) {
    greeting = "Good morning!";
  } else if (today.getHours() < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }

  return (
    <Wrapper>
      <NewEventDialog />
      <TopBanner>
        <Logo src={plannerLogo} />
        <Greeting>
          <Welcome>{greeting}</Welcome>
          <MainDate>
            It's {format(today, "EEEE, LLLL do").toLowerCase()}.
          </MainDate>
        </Greeting>
      </TopBanner>
      <Events>
        <SectionTitle>Preview of your day</SectionTitle>
        {dayEvents.map((ev) => {
          return (
            <EventLine>
              <EventHour>
                {parseInt(ev.start.time.hours)}:{ev.start.time.minutes}{" "}
                {ev.start.time.ap.toLowerCase()}
              </EventHour>
              <EventTitle>{ev.title}</EventTitle>
            </EventLine>
          );
        })}
      </Events>
      <SectionTitle>Explore your planner</SectionTitle>
      <ActionSec>
        <ActionIcon
          onClick={(ev) => {
            history.push(`/date/${format(today, "y-MM-dd")}`);
          }}
        >
          <MdToday size="40" color={`${COLORS.icon1}`} />
          <IconText>Today</IconText>
        </ActionIcon>
        <ActionIcon
          onClick={() => history.push(`/week/${format(today, "y-MM-dd")}`)}
        >
          <BiCalendarWeek size="40" color={`${COLORS.icon1}`} />
          <IconText>Week</IconText>
        </ActionIcon>
        <ActionIcon onClick={() => history.push("/calendar-month")}>
          <GoCalendar size="40" color={`${COLORS.icon1}`} />
          <IconText>Month</IconText>
        </ActionIcon>
        <ActionIcon>
          <BiTimer size="40" color={`${COLORS.icon1}`} />
          <IconText>Focus</IconText>
        </ActionIcon>
        <ActionIcon>
          <BiTimer
            onClick={() => history.push("/music")}
            size="40"
            color={`${COLORS.icon1}`}
          />
          <IconText>Playlists</IconText>
        </ActionIcon>
        <ActionIcon>
          <BiTimer size="40" color={`${COLORS.icon1}`} />
          <IconText>Weather</IconText>
        </ActionIcon>
      </ActionSec>
      <NewsFeed />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.background};
  margin: 0;
  padding: 0;
  width: 100vw;
`;
const TopBanner = styled.div`
  display: flex;
  flex-direction: row;
  background: ${COLORS.gradientRoseanna};
  border-radius: 5px;
  margin: 10px;
  padding: 20px 0px 20px 20px;
`;
const Logo = styled.img`
  width: 80px;
  height: 90px;
`;
const Greeting = styled.div`
  margin: 10px;
  padding: 10px 0;
`;
const Welcome = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  padding: 0px 20px 0px 20px;
  color: ${COLORS.text1};
`;
const MainDate = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${COLORS.text1};
  padding: 0px 20px;
  padding-top: 0px;
`;
const SectionTitle = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0 10px 0;
  padding-bottom: 6px;
  font-weight: 600;
  font-family: "Varela Round", sans-serif;
`;
const Events = styled.div`
  margin: 10px;
`;
const EventLine = styled.div`
  display: flex;
  margin-left: 15vw;
  margin-bottom: 10px;
  align-items: center;
`;
const EventHour = styled.div`
  color: #ffafbd;
  margin-right: 10px;
  font-weight: 500;
  font-size: 1rem;
`;
const EventTitle = styled.div`
  font-size: 1rem;
  font-family: "Varela Round", sans-serif;
`;
const ActionSec = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 10px;
  justify-content: space-between;
`;
const ActionIcon = styled.div`
  width: 31%;
  margin-bottom: 15px;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  //box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
const IconText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: "Varela Round", sans-serif;
`;
export default Homepage;
