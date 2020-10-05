import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const Text = styled.span`
  font-weight: 600;
`;
const FatText = ({ text }) => <Text>{text}</Text>;
FatText.propTypes = {
  text: propTypes.string.isRequired,
};
export default FatText;
