import PropTypes from 'prop-types';

export const VISIT = {
  id: PropTypes.number.isRequired,
  startsAt: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
  allDay: PropTypes.bool.isRequired,
};
