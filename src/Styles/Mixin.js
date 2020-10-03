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
