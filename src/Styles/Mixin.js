import { css } from "styled-components";
import theme from "./Theme";

export const whiteBox = css`
  border-radius: ${theme.borderRadius};
  border: 1px solid ${theme.boxBorder};
  background-color: white;
`;

export const flex = (
  direction = "row",
  align = "flex-start",
  justify = "flex-start"
) => {
  return css`
    display: flex;
    align-items: ${align};
    justify-content: ${justify};
    flex-direction: ${direction};
  `;
};

export const avatarImageSize = (size) => {
  if (size === "sm") {
    return css`
      width: 30px;
      height: 30px;
    `;
  } else if (size === "md") {
    return css`
      width: 50px;
      height: 50px;
    `;
  } else if (size === "lg") {
    return css`
      width: 150px;
      height: 150px;
    `;
  }
};

export const TimeStampStyle = css`
  display: block;
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.8;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.lightGreyColor};
`;

export const TextAreaWrapperStyle = css`
  position: relative;
  ${flex("row", "center", "center")};
  padding: 10px 0;
`;

export const TextAreaStyle = css`
  resize: none;
  flex: 1;
  border: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  &:disabled {
    outline: none;
    background-color: white;
  }
`;
