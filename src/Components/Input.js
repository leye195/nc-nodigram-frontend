import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
const Container = styled.input`
  border: 0;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 9px 0 7px 8px;
  height: 40px;
  font-size: 12px;
`;
const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);
Input.propTypes = {
  placeholder: propTypes.string.isRequired,
  required: propTypes.bool,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  type: propTypes.string,
};
export default Input;
