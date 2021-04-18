import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dayColors } from "../Constants";

let googleNews = [
  {
    id:
      "CBMiXWh0dHBzOi8vd3d3LmNiYy5jYS9uZXdzL2NhbmFkYS9tb250cmVhbC9jb3ZpZC0xOS1pbi1xdWViZWMtbmVlZC10by1rbm93LWFwcmlsLTE3LTE4LTEuNTk5MDg2MtIBIGh0dHBzOi8vd3d3LmNiYy5jYS9hbXAvMS41OTkwODYy",
    title: "COVID-19 in Quebec: What you need to know this weekend - CBC.ca",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMiXWh0dHBzOi8vd3d3LmNiYy5jYS9uZXdzL2NhbmFkYS9tb250cmVhbC9jb3ZpZC0xOS1pbi1xdWViZWMtbmVlZC10by1rbm93LWFwcmlsLTE3LTE4LTEuNTk5MDg2MtIBIGh0dHBzOi8vd3d3LmNiYy5jYS9hbXAvMS41OTkwODYy?oc=5",
    published: "Sat, 17 Apr 2021 12:20:13 GMT",
    sub_articles: [],
    source: {
      href: "https://www.cbc.ca",
      title: "CBC.ca",
    },
  },
  {
    id:
      "CBMiX2h0dHBzOi8vbW9udHJlYWxnYXpldHRlLmNvbS9idXNpbmVzcy9sb2NhbC1idXNpbmVzcy9vbi10aGUtZnJvbnQtbGluZXMtb2YtbWlsZS1lbmRzLWNoaWNrZW4td2Fy0gGNAWh0dHBzOi8vbW9udHJlYWxnYXpldHRlLmNvbS9idXNpbmVzcy9sb2NhbC1idXNpbmVzcy9vbi10aGUtZnJvbnQtbGluZXMtb2YtbWlsZS1lbmRzLWNoaWNrZW4td2FyL3djbS9mYjYyM2U2Ni1jYTdkLTQ4MWYtYjhkYS02MzEyYTk4NmU5YzEvYW1wLw",
    title: "On the front lines of Mile End's chicken war - Montreal Gazette",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMiX2h0dHBzOi8vbW9udHJlYWxnYXpldHRlLmNvbS9idXNpbmVzcy9sb2NhbC1idXNpbmVzcy9vbi10aGUtZnJvbnQtbGluZXMtb2YtbWlsZS1lbmRzLWNoaWNrZW4td2Fy0gGNAWh0dHBzOi8vbW9udHJlYWxnYXpldHRlLmNvbS9idXNpbmVzcy9sb2NhbC1idXNpbmVzcy9vbi10aGUtZnJvbnQtbGluZXMtb2YtbWlsZS1lbmRzLWNoaWNrZW4td2FyL3djbS9mYjYyM2U2Ni1jYTdkLTQ4MWYtYjhkYS02MzEyYTk4NmU5YzEvYW1wLw?oc=5",
    published: "Sat, 17 Apr 2021 10:03:39 GMT",
    sub_articles: [],
    source: {
      href: "https://montrealgazette.com",
      title: "Montreal Gazette",
    },
  },
  {
    id: "CAIiEO6YcIPR2aI50xXXOubkyl0qGQgEKhAIACoHCAow7PeJCzCV0pwDMLHPowY",
    title:
      "Vaccine confusion: Pregnant woman in Montreal refused a shot even though she's eligible - CTV News Montreal",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMifGh0dHBzOi8vbW9udHJlYWwuY3R2bmV3cy5jYS92YWNjaW5lLWNvbmZ1c2lvbi1wcmVnbmFudC13b21hbi1pbi1tb250cmVhbC1yZWZ1c2VkLWEtc2hvdC1ldmVuLXRob3VnaC1zaGUtcy1lbGlnaWJsZS0xLjUzOTA0NjDSAT9odHRwczovL2JldGEuY3R2bmV3cy5jYS9sb2NhbC9tb250cmVhbC8yMDIxLzQvMTYvMV81MzkwNDYwLmh0bWw?oc=5",
    published: "Fri, 16 Apr 2021 17:42:00 GMT",
    sub_articles: [],
    source: {
      href: "https://montreal.ctvnews.ca",
      title: "CTV News Montreal",
    },
  },
  {
    id:
      "CBMicGh0dHBzOi8vbW9udHJlYWxnYXpldHRlLmNvbS9uZXdzL2xvY2FsLW5ld3MvZnJvbS10b3VyLWRlLWxpbGUtdG8tb3NoZWFnYS1tb250cmVhbHMtc3VtbWVyLWV2ZW50cy1rZWVwLWhvcGUtYWxpdmXSAZ4BaHR0cHM6Ly9tb250cmVhbGdhemV0dGUuY29tL25ld3MvbG9jYWwtbmV3cy9mcm9tLXRvdXItZGUtbGlsZS10by1vc2hlYWdhLW1vbnRyZWFscy1zdW1tZXItZXZlbnRzLWtlZXAtaG9wZS1hbGl2ZS93Y20vMzYwOTJmMzEtY2M1Yy00MDQ2LWI0ZmEtYTMzMzdlYzI3MWVjL2FtcC8",
    title:
      "From Tour de l'Île to Osheaga, Montreal summer events keep hope alive - Montreal Gazette",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMicGh0dHBzOi8vbW9udHJlYWxnYXpldHRlLmNvbS9uZXdzL2xvY2FsLW5ld3MvZnJvbS10b3VyLWRlLWxpbGUtdG8tb3NoZWFnYS1tb250cmVhbHMtc3VtbWVyLWV2ZW50cy1rZWVwLWhvcGUtYWxpdmXSAZ4BaHR0cHM6Ly9tb250cmVhbGdhemV0dGUuY29tL25ld3MvbG9jYWwtbmV3cy9mcm9tLXRvdXItZGUtbGlsZS10by1vc2hlYWdhLW1vbnRyZWFscy1zdW1tZXItZXZlbnRzLWtlZXAtaG9wZS1hbGl2ZS93Y20vMzYwOTJmMzEtY2M1Yy00MDQ2LWI0ZmEtYTMzMzdlYzI3MWVjL2FtcC8?oc=5",
    published: "Sat, 17 Apr 2021 12:56:15 GMT",
    sub_articles: [],
    source: {
      href: "https://montrealgazette.com",
      title: "Montreal Gazette",
    },
  },
  {
    id: "CAIiEONa9mSYHID2upXhrH0KfLwqGQgEKhAIACoHCAow3KuCCzDNkv8CMKiz8wU",
    title:
      "Montreal Restaurants Work Around Outdoor Dining Ban With City Parks - Eater Montreal",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMieGh0dHBzOi8vbW9udHJlYWwuZWF0ZXIuY29tLzIwMjEvNC8xNi8yMjM4NTk0Mi9tb250cmVhbC1yZXN0YXVyYW50cy10YWtlb3V0LWRlbGl2ZXJ5LWNpdHktcGFya3Mtb3V0ZG9vci1pbmRvb3ItZGluaW5nLWJhbtIBhQFodHRwczovL21vbnRyZWFsLmVhdGVyLmNvbS9wbGF0Zm9ybS9hbXAvMjAyMS80LzE2LzIyMzg1OTQyL21vbnRyZWFsLXJlc3RhdXJhbnRzLXRha2VvdXQtZGVsaXZlcnktY2l0eS1wYXJrcy1vdXRkb29yLWluZG9vci1kaW5pbmctYmFu?oc=5",
    published: "Fri, 16 Apr 2021 17:16:50 GMT",
    sub_articles: [],
    source: {
      href: "https://montreal.eater.com",
      title: "Eater Montreal",
    },
  },
  {
    id:
      "CBMiZmh0dHBzOi8vd3d3LmNiYy5jYS9uZXdzL2NhbmFkYS9tb250cmVhbC9ib2RpZXMtc3VzcGljaW91cy1tb250cmVhbC1tZXJjaWVyLXByb3ZpbmNpYWwtcG9saWNlLTEuNTk5MTY5NtIBIGh0dHBzOi8vd3d3LmNiYy5jYS9hbXAvMS41OTkxNjk2",
    title:
      "Police say death of couple on Montreal's South Shore is another case of domestic violence - CBC.ca",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMiZmh0dHBzOi8vd3d3LmNiYy5jYS9uZXdzL2NhbmFkYS9tb250cmVhbC9ib2RpZXMtc3VzcGljaW91cy1tb250cmVhbC1tZXJjaWVyLXByb3ZpbmNpYWwtcG9saWNlLTEuNTk5MTY5NtIBIGh0dHBzOi8vd3d3LmNiYy5jYS9hbXAvMS41OTkxNjk2?oc=5",
    published: "Sat, 17 Apr 2021 00:22:00 GMT",
    sub_articles: [],
    source: {
      href: "https://www.cbc.ca",
      title: "CBC.ca",
    },
  },
  {
    id:
      "CBMiY2h0dHBzOi8vbW9udHJlYWxnYXpldHRlLmNvbS9uZXdzL2xvY2FsLW5ld3MvMTAtdGhpbmdzLXRvLWRvLWluLW1vbnRyZWFsLXRoaXMtd2Vla2VuZC1hcHJpbC0xNi10by0xONIBkQFodHRwczovL21vbnRyZWFsZ2F6ZXR0ZS5jb20vbmV3cy9sb2NhbC1uZXdzLzEwLXRoaW5ncy10by1kby1pbi1tb250cmVhbC10aGlzLXdlZWtlbmQtYXByaWwtMTYtdG8tMTgvd2NtLzU1ZDIwM2Y4LWNiZWYtNDU3Ni1iNTdhLTcyYzc5ZjRkZjVhNC9hbXAv",
    title:
      "10 things to do in Montreal this weekend, April 16 to 18 - Montreal Gazette",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMiY2h0dHBzOi8vbW9udHJlYWxnYXpldHRlLmNvbS9uZXdzL2xvY2FsLW5ld3MvMTAtdGhpbmdzLXRvLWRvLWluLW1vbnRyZWFsLXRoaXMtd2Vla2VuZC1hcHJpbC0xNi10by0xONIBkQFodHRwczovL21vbnRyZWFsZ2F6ZXR0ZS5jb20vbmV3cy9sb2NhbC1uZXdzLzEwLXRoaW5ncy10by1kby1pbi1tb250cmVhbC10aGlzLXdlZWtlbmQtYXByaWwtMTYtdG8tMTgvd2NtLzU1ZDIwM2Y4LWNiZWYtNDU3Ni1iNTdhLTcyYzc5ZjRkZjVhNC9hbXAv?oc=5",
    published: "Fri, 16 Apr 2021 18:11:41 GMT",
    sub_articles: [],
    source: {
      href: "https://montrealgazette.com",
      title: "Montreal Gazette",
    },
  },
  {
    id: "CAIiEMTq1-uZAo6nOKQgjSqLN7UqGQgEKhAIACoHCAowivGXCzCmmq8DMLri0AY",
    title:
      "A Hilarious TikTok Shows How Montrealers From Different Areas React To COVID-19 Rules - MTL Blog",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMibGh0dHBzOi8vd3d3Lm10bGJsb2cuY29tL2VuLWNhL3Blb3BsZS9tb250cmVhbC90aWt0b2stc2hvd3MtbW9udHJlYWwtbmVpZ2hib3VyaG9vZHMtcmVhY3RpbmctdG8tY292aWQxOS1ydWxlc9IBWmh0dHBzOi8vd3d3Lm10bGJsb2cuY29tL2FtcC90aWt0b2stc2hvd3MtbW9udHJlYWwtbmVpZ2hib3VyaG9vZHMtcmVhY3RpbmctdG8tY292aWQxOS1ydWxlcw?oc=5",
    published: "Fri, 16 Apr 2021 18:42:41 GMT",
    sub_articles: [],
    source: {
      href: "https://www.mtlblog.com",
      title: "MTL Blog",
    },
  },
  {
    id: "CAIiEBT_PuT0Lj_Nuh5-v-UzfqIqGQgEKhAIACoHCAow7PeJCzCV0pwDMLHPowY",
    title:
      "'It keeps happening': Black Montrealer alleges racial profiling after traffic stop - CTV News Montreal",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMidWh0dHBzOi8vbW9udHJlYWwuY3R2bmV3cy5jYS9pdC1rZWVwcy1oYXBwZW5pbmctYmxhY2stbW9udHJlYWxlci1hbGxlZ2VzLXJhY2lhbC1wcm9maWxpbmctYWZ0ZXItdHJhZmZpYy1zdG9wLTEuNTM5MDM5ONIBP2h0dHBzOi8vYmV0YS5jdHZuZXdzLmNhL2xvY2FsL21vbnRyZWFsLzIwMjEvNC8xNi8xXzUzOTAzOTguaHRtbA?oc=5",
    published: "Fri, 16 Apr 2021 16:46:00 GMT",
    sub_articles: [],
    source: {
      href: "https://montreal.ctvnews.ca",
      title: "CTV News Montreal",
    },
  },
  {
    id: "CAIiEJc5LkuLp_iuc6o1FOQ_0vYqGQgEKhAIACoHCAowivGXCzCmmq8DMJvd0AY",
    title:
      "11 Apartments For Rent Under $1,000/Month In 11 Different Montreal Boroughs - MTL Blog",
    link:
      "https://news.google.com/__i/rss/rd/articles/CBMiYmh0dHBzOi8vd3d3Lm10bGJsb2cuY29tL2VuLWNhL3JlYWwtZXN0YXRlL21vbnRyZWFsLzExLW1vbnRyZWFsLWFwYXJ0bWVudHMtZm9yLXJlbnQtdW5kZXItMTAwMG1vbnRo0gFLaHR0cHM6Ly93d3cubXRsYmxvZy5jb20vYW1wLzExLW1vbnRyZWFsLWFwYXJ0bWVudHMtZm9yLXJlbnQtdW5kZXItMTAwMG1vbnRo?oc=5",
    published: "Fri, 16 Apr 2021 13:59:17 GMT",
    sub_articles: [],
    source: {
      href: "https://www.mtlblog.com",
      title: "MTL Blog",
    },
  },
];

const NewsFeed = () => {
  let colorIndex = 0;
  return (
    <Wrapper>
      {googleNews.map((article) => {
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
