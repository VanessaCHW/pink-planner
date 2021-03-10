import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../Constants";

import DateIcon from "./DateIcon";
import AddEventIcon from "../Components/AddEventIcon";

const Homepage = () => {
  const today = new Date();
  return (
    <Wrapper>
      Homepage
      <DateContainer to="/calendar-month">
        <DateIcon today={today} />
      </DateContainer>
      <div>Other icons</div>
      <AddEventIcon />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: ${COLORS.background};
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;
const DateContainer = styled(Link)`
  text-decoration: none;
`;

export default Homepage;
