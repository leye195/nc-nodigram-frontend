import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
const Container = styled.input`
  border: 0;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 9px 0 7px 9px;
  height: 40px;
  font-size: 12px;
  &.search {
    width: 80%;
    background-color: ${(props) => props.theme.bgColor};
    font-size: 14px;
    padding: 10px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    &::placeholder {
      opacity: 0.6;
      font-weight: 200;
    }
  }
`;
const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
  className,
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    className={className}
  />
);
Input.propTypes = {
  className: propTypes.string,
  placeholder: propTypes.string.isRequired,
  required: propTypes.bool,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  type: propTypes.string,
};
export default Input;
