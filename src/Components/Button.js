import React from "react";
import styled from "styled-components";
import propsType from "prop-types";

const Container = styled.button`
  font-weight: 600;
  background-color: ${(props) => props.theme.blueColor};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  width: 100%;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
`;

const Button = ({ text }) => <Container>{text}</Container>;
Button.propsType = {
  text: propsType.string.isRequired,
};
export default Button;
