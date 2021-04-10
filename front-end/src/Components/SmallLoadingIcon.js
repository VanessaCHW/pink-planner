import React from "react";
import styled, { keyframes } from "styled-components";

import { ImSpinner2 } from "react-icons/im";

const SmallLoadingIcon = () => {
  return (
    <SectionBox>
      <StyledIcon>
        <ImSpinner2 size="25" />
      </StyledIcon>
    </SectionBox>
  );
};

export default SmallLoadingIcon;

const turnIcon = keyframes`
    from { transform: rotate(0deg)}
    to{transform: rotate(360deg)}
`;

const StyledIcon = styled.div`
  color: gray;
  width: 25px;
  height: 25px;
  animation: ${turnIcon} 1.5s infinite linear;
`;

const SectionBox = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
`;
