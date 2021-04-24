import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dayColors } from "../Constants";

const NewsFeed = ({ articles }) => {
  let colorIndex = 0;
  return (
    <Wrapper>
      {articles.map((article) => {
        return (
          <AnchorBox target="_blank" href={article.link}>
            <ArticleBox
              style={{
                backgroundColor: `${dayColors[colorIndex++]}`,
              }}
            >
              <Title key={article.id}>
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
