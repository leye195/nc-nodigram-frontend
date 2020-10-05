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
