import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { COLORS } from "../Constants";

const DayView = () => {
  const history = useHistory();
  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      <div>Some date data</div>
    </div>
  );
};

export default DayView;
