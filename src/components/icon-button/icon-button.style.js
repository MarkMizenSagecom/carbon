import styled, { css } from "styled-components";
import StyledIcon from "../icon/icon.style";
import { baseTheme } from "../../style/themes";

const StyledIconButton = styled.button.attrs({ type: "button" })`
  background: transparent;
  border: none;
  padding: 0;

  ${({ theme }) => css`
    &:focus {
      color: ${theme.text.color};
      background-color: transparent;
      outline: solid 3px ${theme.colors.focus};
      z-index: 1;
    }
  `}

  &:hover {
    cursor: pointer;
  }

  &::-moz-focus-inner {
    border: none;
  }

  ${StyledIcon} {
    position: relative;

    &:focus {
      border: none;
    }
  }
`;

StyledIconButton.defaultProps = {
  theme: baseTheme,
};

export default StyledIconButton;
