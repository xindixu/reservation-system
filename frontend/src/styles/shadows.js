import colors from "./colors"

const shadowColor = {
  light: "hsla(0,0%,0%, 0.05)",
  normal: "hsla(0,0%,0%, 0.1)",
  dark: "hsla(0,0%,0%, 0.25)",
}

const shadowSize = {
  sm: `0 1px 2px`,
  base: `0 2px 4px`,
  md: `0 2px 8px`,
  lg: `0 4px 16px`,
  xl: `0 8px 32px`,
}

const shadows = {
  shadowSmLight: `${shadowSize.sm} ${shadowColor.light}`,
  shadowSm: `${shadowSize.sm} ${shadowColor.normal}`,
  shadowSmDark: `${shadowSize.sm} ${shadowColor.dark}`,
  shadowBaseLight: `${shadowSize.base} ${shadowColor.light}`,
  shadowBase: `${shadowSize.base} ${shadowColor.normal}`,
  shadowBaseDark: `${shadowSize.base} ${shadowColor.dark}`,
  shadowMdLight: `${shadowSize.md} ${shadowColor.light}`,
  shadowMd: `${shadowSize.md} ${shadowColor.normal}`,
  shadowMdDark: `${shadowSize.md} ${shadowColor.dark}`,
  shadowLgLight: `${shadowSize.lg} ${shadowColor.light}`,
  shadowLg: `${shadowSize.lg} ${shadowColor.normal}`,
  shadowLgDark: `${shadowSize.lg} ${shadowColor.dark}`,
  shadowXlLight: `${shadowSize.xl} ${shadowColor.light}`,
  shadowXl: `${shadowSize.xl} ${shadowColor.normal}`,
  shadowXlDark: `${shadowSize.xl} ${shadowColor.dark}`,
  shadowInset: `inset 0 1px 2px ${shadowColor.light}`,
}

export default shadows
