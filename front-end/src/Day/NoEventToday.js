import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import picture from "./img.png";

const NoEventToday = () => {
  let history = useHistory();

  return (
    <Wrapper>
      <p>You have nothing planned for the day!</p>
      <p className="TapMsg">Tap " + " to add a task.</p>
      <Img src={picture} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  text-align: center;
  margin: auto;
  padding-top: 30px;
  font-size: 1.2rem;
  .TapMsg {
    padding-top: 15px;
    font-size: 1.3rem;
  }
`;
const Img = styled.img`
  max-width: 100vw;
`;
export default NoEventToday;
