import colors from "./colors"
import shadows from "./shadows"

const styleSettings = {
  spacerXxs: "0.125rem",
  spacerXs: "0.25rem",
  spacerSm: "0.5rem",
  spacer: "1rem",
  spacerMd: "1.5rem",
  spacerLg: "2rem",
  spacerXl: "3rem",
  spacerXxl: "4rem",

  // componentSize
  componentSizeBase: "128px",

  // border
  borderWidthSm: "1px",
  borderWidthMd: "3px",

  borderRadiusBase: "15px",
  borderRadiusLg: "32px",

  // font
  fontSizeXxs: "8px",
  fontSizeXs: "10px",
  fontSizeSm: "12px",
  fontSizeBase: "14px",

  // transparency
  transparentLight: "25",
  transparentBase: "50",

  // zIndex
  zDropdown: "30",
  zBackground: "-10",
  zHover: "10",
  zModal: "130",
  zModalOverlay: "100",
  zModalTooltips: "150",
  zStickyFooter: "31", // zDropdown + 1
  zTooltips: "90",
  ...colors,
  ...shadows,
}

export const componentSizes = {
  toolbarHeight: "50px",
}

export default styleSettings
