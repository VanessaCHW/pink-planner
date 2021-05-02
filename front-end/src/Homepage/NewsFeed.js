import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { dayColors } from "../Constants";
import { rapidKey } from "./key";

const NewsFeed = ({ today }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("date") === format(today, "yyyy-MM-dd")) {
      console.log("Local storage is fine");
      setArticles(JSON.parse(localStorage.getItem("articles")));
    } else {
      console.log("LOCAL STORAGE: needs to be updated");

      fetch(
        "https://google-news.p.rapidapi.com/v1/geo_headlines?lang=en&country=CA&geo=Montreal",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": rapidKey,
            "x-rapidapi-host": "google-news.p.rapidapi.com",
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setArticles(response.articles.slice(0, 15));
          localStorage.setItem("date", format(today, "yyyy-MM-dd"));
          localStorage.setItem("articles", JSON.stringify(response.articles));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [today]);

  let colorIndex = 0;

  if (articles) {
    return (
      <Wrapper>
        {articles.map((article) => {
          return (
            <AnchorBox target="_blank" href={article.link} key={article.id}>
              <ArticleBox
                style={{
                  backgroundColor: `${dayColors[colorIndex++]}`,
                }}
              >
                <Title>
                  {article.title.slice(0, article.title.indexOf(" - "))}
                </Title>
                <Source>{article.source.title}</Source>
                <Date>
                  {article.published.slice(
                    0,
                    article.published.indexOf("2021") + 4
                  )}
                </Date>
              </ArticleBox>
            </AnchorBox>
          );
        })}
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

const Wrapper = styled.div`
  margin: 10px;
  display: flex;
  overflow: auto;
  width: 95%;
`;
const ArticleBox = styled.div`
  min-width: 160px;
  min-height: 160px;
  margin-right: 10px;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const AnchorBox = styled.a`
  text-decoration: none;
`;
const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  font-family: "Varela Round", sans-serif;
  overflow: hidden;
`;
const Source = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  padding-bottom: 18px;
  padding-top: 5px;
  color: grey;
`;
const Date = styled.div`
  font-size: 0.9rem;
  color: grey;
  position: absolute;
  bottom: 10px;
  width: 90%;
  text-align: right;
`;
export default NewsFeed;
