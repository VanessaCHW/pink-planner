import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { COLORS } from "../Constants";
import NewEventDialog from "../Components/NewEventDialog";

const Music = () => {
  return (
    <div>
      <NewEventDialog />
      <div>Music</div>
      <div>
        <iframe
          src="https://www.youtube.com/embed/zL1gMeoN8bI"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/x4Xt3P7FQ2M"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default Music;
