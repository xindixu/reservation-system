const avatarSizes = {
  xs: "50x50",
  sm: "100x100",
  md: "250x250",
  lg: "500x500",
}

export const getDefaultAvatar = (key, size) =>
  `https://robohash.org/${key}.png?size=${avatarSizes[size]}&set=set4`
