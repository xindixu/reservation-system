import styled, { keyframes, css } from "styled-components"
import { styleSettings } from "styles/index"

const { shadowXlDark, spacerMd, spacerLg, spacerXl, zStickyFooter } = styleSettings

const rotate135DegIn = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-135deg);
  }
`

const rotate135DegOut = keyframes`
  from {
    transform: rotate(-135deg);
  }

  to{
    transform: rotate(0deg);
  }
`

const rotateIn = css`
  animation: ${rotate135DegIn} 0.1s linear;
  transform: rotate(-135deg);
`

const rotateOut = css`
  animation: ${rotate135DegOut} 0.1s linear;
  transform: rotate(0deg);
`

export const FAButtonPosition = styled.div`
  position: fixed;
  bottom: ${spacerLg};
  right: ${spacerLg};
  z-index: ${zStickyFooter};
  box-shadow: ${shadowXlDark};
  border-radius: 50%;

  button {
    width: ${spacerXl};
    height: ${spacerXl};
    padding: 0;
  }
  svg {
    transform-origin: center;
    ${({ rotate }) => (rotate ? rotateIn : rotateOut)}
    width: ${spacerMd};
    height: ${spacerMd};
  }
`
