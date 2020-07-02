import styled, { keyframes, css } from "styled-components"
import { styleSettings } from "styles/index"

const { shadowXlDark, spacerMd, spacerLg, spacerXl, zStickyFooter } = styleSettings

const rotate45DegIn = keyframes`
  from {
    transform: rotate(0deg);
  }

  to{
    transform: rotate(45deg);
  }
`

const rotate45DegOut = keyframes`
  from {
    transform: rotate(45deg);
  }

  to{
    transform: rotate(0deg);
  }
`

const rotateIn = css`
  animation: ${rotate45DegIn} 0.1s linear;
  transform: rotate(45deg);
`

const rotateOut = css`
  animation: ${rotate45DegOut} 0.1s linear;
  transform: rotate(0deg);
`

export const FAButtonPosition = styled.div`
  position: fixed;
  bottom: ${spacerLg};
  right: ${spacerLg};
  z-index: ${zStickyFooter};
  box-shadow: ${shadowXlDark};
  border-radius: 50%;
  ${({ rotate }) => (rotate ? rotateIn : rotateOut)}

  button {
    width: ${spacerXl};
    height: ${spacerXl};
    padding: 0;
  }
  svg {
    width: ${spacerMd};
    height: ${spacerMd};
  }
`
