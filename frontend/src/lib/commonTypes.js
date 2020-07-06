import PropTypes from "prop-types"

export const VISIT = {
  id: PropTypes.string.isRequired,
  startsAt: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
}

export const TEAM = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  managersCount: PropTypes.number.isRequired,
}

export const MANAGER = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}

export const CLIENT = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  cycle: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}

export const SLOT = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  shareable: PropTypes.bool.isRequired,
}

export const FORM = {
  setFieldsValue: PropTypes.func.isRequired,
  getFieldsValue: PropTypes.func.isRequired,
}
