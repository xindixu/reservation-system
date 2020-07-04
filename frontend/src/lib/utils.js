const avatarSizes = {
  xs: "50x50",
  sm: "100x100",
  md: "250x250",
  lg: "500x500",
}

export const getFullName = (user) => `${user.firstName} ${user.lastName}`
export const getDefaultAvatar = (user, size) =>
  `https://robohash.org/${getFullName(user)}.png?size=${avatarSizes[size]}&set=set4`
