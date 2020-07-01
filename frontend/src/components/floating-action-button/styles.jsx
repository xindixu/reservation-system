import styled from "styled-components"
import { styleSettings } from "styles/index"

const { spacerLg, zStickyFooter } = styleSettings
export const FAButtonPosition = styled.main`
  position: fixed;
  bottom: ${spacerLg};
  right: ${spacerLg};
  z-index: ${zStickyFooter};
`
