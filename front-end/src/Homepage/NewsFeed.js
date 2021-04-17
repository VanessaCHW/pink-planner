import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";

const articles = {
  status: "ok",
  articles: [
    {
      summary:
        "As COVID-19 public safety measures continue, the City of Penticton has fast-tracked their plan to expand patio spaces for downtown businesses on the 200 block of Martin Street. 'We are extending the patio space so that restaurants along this block can extend their patios and allow more people to enjoy more outdoor dining,' said Carly Lewis, the City of Penticton's economic development manager.The extra patio space was already planned but was moved up to help mitigate some of the lost revenue due to the shutdown of indoor dining.",
      country: "CA",
      author: "Darrian Matassa-Fung",
      link: "https://globalnews.ca/news/7765122/penticton-covid-patio-permits/",
      language: "en",
      media:
        "https://globalnews.ca/wp-content/uploads/2021/04/PATIO-PLAN-THUMB-FOR-DAL-e1618616736338.jpg?quality=85&strip=all&w=720&h=379&crop=1",
      title:
        "City of Penticton fast-tracks permits for extra patio space amid indoor dining shutdown",
      media_content:
        "https://globalnews.ca/wp-content/uploads/2021/04/PATIO-PLAN-THUMB-FOR-DAL-e1618616736338.jpg?quality=85&strip=all",
      clean_url: "globalnews.ca",
      rights: "globalnews.ca",
      rank: "893",
      topic: "news",
      published_date: "2021-04-17 00:15:00",
      _id: "1cf99e61eab2e1da0ddc383300ac503e",
    },
    {
      summary:
        "Checkpoints will be used to monitor movements. Exceptions will be made for people travelling for work, medical care or the movement of goods. As of Monday, travel between the Quevec and Ontario will be restricted with police checkpoints to monitor movements. Photo by Graham Hughes /THE CANADIAN PRESS QUEBEC — The Legault government has responded to Ontario's decision to close its border Monday by doing the same thing in a bid to curb the spread of COVID-19 between the provinces. And Premier François Legault has pledged to fully co-operate with the government of Ontario and Premier Doug Ford 'to ensure the safety of our citizens.",
      country: "CA",
      author: "Philip Authier, Montreal Gazette",
      link:
        "https://montrealgazette.com/news/quebec/quebec-ontario-border-will-close-monday-as-provinces-battle-variants",
      language: "en",
      media:
        "https://smartcdn.prod.postmedia.digital/montrealgazette/wp-content/uploads/2021/04/covid-que-20200329.jpg",
      title:
        "Quebec-Ontario border will close Monday as provinces battle variants",
      media_content: null,
      clean_url: "montrealgazette.com",
      rights: "montrealgazette.com",
      rank: "3123",
      topic: "news",
      published_date: "2021-04-17 00:13:27",
      _id: "7afad5e29e487fba56173e6fef9b89ca",
    },
    {
      summary:
        "The Blue Jays entered spring training with one of their deepest rosters in recent memory. They were built to withstand some of the inevitable injuries that would soon follow, but whether they will be able to survive upwards of 10 or more remains to be seen.Toronto's roster has been decimated in recent weeks by a series of setbacks. The medical report is starting to become so long that it could field its own team and every day seems to find the Jays dealing with another round of ailments. Strained obliques, sore quads, wonky elbows, even a positive COVID-19 test, the list goes on and on.",
      country: "CA",
      author: "Gregor Chisholm - Baseball Columnist",
      link:
        "https://www.thestar.com/sports/bluejays/opinion/2021/04/16/the-next-man-up-approach-is-keeping-the-blue-jays-from-sliding-down-the-standings.html",
      language: "en",
      media:
        "https://images.thestar.com/VWwaF1z1PV_ljtkry5ch-eN0Keo=/1200x800/smart/filters:cb(1618618238537)/https://www.thestar.com/content/dam/thestar/sports/bluejays/opinion/2021/04/16/the-next-man-up-approach-is-keeping-the-blue-jays-from-sliding-down-the-standings/pearson.jpg",
      title:
        "Gregor Chisholm: The next-man-up approach is keeping the Blue Jays from sliding down the standings",
      media_content:
        "https://www.thestar.com/content/dam/thestar/sports/bluejays/opinion/2021/04/16/the-next-man-up-approach-is-keeping-the-blue-jays-from-sliding-down-the-standings/pearson.jpg",
      clean_url: "thestar.com",
      rights:
        "© Copyright 1996 - 2020 Toronto Star Newspapers Limited. All Rights Reserved , http://www.thestar.com/terms",
      rank: "818",
      topic: "sport",
      published_date: "2021-04-17 00:10:38",
      _id: "86d229be10d6336fadc4e7cb3248b8bb",
    },
    {
      summary:
        "As outgoing Estevan Police Chief Paul Ladouceur began his last day on the job Friday, he underscored his choice to leave 'has absolutely nothing to do with so-called pressure from the Sask. fed. (Saskatchewan Federation of Police Officers, SFPO) or from social media posts.' Ladouceur tendered his resignation last week following seven years leading the Estevan Police Service. The Leader-Post last week reported Ladouceur was dealing with union pressure from the SFPO. The provincewide police officer's union believes Ladouceur and Estevan's board of police commissioners inappropriately handled Workers Compensation Board (WCB) claims filed by late constable Jay Pierson, by appealing those claims.",
      country: "CA",
      author:
        "Evan Radford, Local Journalism Initiative Reporter, Regina Leader-Post - The Leader-Post",
      link:
        "https://www.thestar.com/news/canada/2021/04/16/paul-ladouceur-recounts-time-as-estevan-police-chief.html",
      language: "en",
      media: "https://www.thestar.com/assets/img/thestar-ribbon.png",
      title: "Paul Ladouceur recounts time as Estevan police chief",
      media_content: null,
      clean_url: "thestar.com",
      rights:
        "© Copyright 1996 - 2020 Toronto Star Newspapers Limited. All Rights Reserved , http://www.thestar.com/terms",
      rank: "818",
      topic: "news",
      published_date: "2021-04-17 00:10:36",
      _id: "d3fecf30ea86fc2e19687402221747ac",
    },
    {
      summary:
        "A new sign has appeared on the old Average Joe's building on 6 Street S in downtown Lethbridge.The sign, The Place, looked familiar to some, but the mystery around it sparked conversation online.'The Place was a nightclub back in the early 1980s before The Cadillac came in,' said Floyd Moncrieff, the general manager of the new, The Place.When Average Joe's officially closed on June 24, 2020, Moncrieff saw an opportunity. He also owns Boss Hogs and Club Lime in Lethbridge.'I've looked at this building for many years.",
      country: "CA",
      author: "Jessica Robb",
      link:
        "https://globalnews.ca/news/7764792/the-place-downtown-lethbridge-return/",
      language: "en",
      media:
        "https://globalnews.ca/wp-content/uploads/2021/04/The-Place.jpg?quality=85&strip=all&w=720&h=379&crop=1",
      title:
        "The Place opening in downtown Lethbridge, offering customers blast from past",
      media_content:
        "https://globalnews.ca/wp-content/uploads/2021/04/The-Place.jpg?quality=85&strip=all",
      clean_url: "globalnews.ca",
      rights: "globalnews.ca",
      rank: "893",
      topic: "news",
      published_date: "2021-04-17 00:10:02",
      _id: "83bc774ea9d60f5719896ae86f3f7f11",
    },
  ],
  user_input: {
    lang: "en",
    country: "CA",
    topic: null,
    media: "True",
  },
};

const NewsFeed = () => {
  const news = articles.articles;
  return (
    <Wrapper>
      {news.map((article) => {
        return (
          <ArticleBox>
            <AnchorBox target="_blank" href={article.link}>
              <ImgContainer>
                <Img src={article.media} />
              </ImgContainer>
              <Title>{article.title}</Title>
              <Source>{article.summary}...</Source>
            </AnchorBox>
          </ArticleBox>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px;
  display: flex;
  overflow: auto;
  width: 95%;
`;
const ArticleBox = styled.div`
  min-width: 270px;
  margin-right: 10px;
  background-color: white;
  border-radius: 10px;
`;
const AnchorBox = styled.a`
  text-decoration: none;
`;
const ImgContainer = styled.div`
  overflow: hidden;
  width: 270px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const Img = styled.img`
  min-height: 100%;
  min-width: 100%;
`;
const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 6px 10px 0px 10px;
  font-family: "Varela Round", sans-serif;
  color: ${COLORS.icon1};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Source = styled.div`
  font-size: 0.9rem;
  padding: 6px 10px 0px 10px;
  color: grey;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
`;
export default NewsFeed;
