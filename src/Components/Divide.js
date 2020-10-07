import React from "react";
import styled from "styled-components";

const Divide = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 40px;
  background-color: ${(props) => props.theme.lightGreyColor};
`;
export default () => <Divide />;
