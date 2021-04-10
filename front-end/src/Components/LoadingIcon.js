import React from "react";
import styled, { keyframes } from "styled-components";

import { ImSpinner2 } from "react-icons/im";

const LoadingIcon = () => {
  return (
    <SectionBox>
      <StyledIcon>
        <ImSpinner2 size="40" />
      </StyledIcon>
    </SectionBox>
  );
};

export default LoadingIcon;

const turnIcon = keyframes`
    from { transform: rotate(0deg)}
    to{transform: rotate(360deg)}
`;

const StyledIcon = styled.div`
  color: gray;
  width: 40px;
  height: 40px;
  animation: ${turnIcon} 1.5s infinite linear;
`;

const SectionBox = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
`;
