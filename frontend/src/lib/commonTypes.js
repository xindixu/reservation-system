import PropTypes from "prop-types"

export const VISIT = {
  id: PropTypes.number.isRequired,
  startsAt: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
  allDay: PropTypes.bool.isRequired,
}

export const COLORS = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "indigo",
  "purple",
  "pink",
]

export const BASE_INPUT = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prepend: PropTypes.node,
  append: PropTypes.node,
}
