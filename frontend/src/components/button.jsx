import React from 'react';
import PropTypes from 'prop-types';

import { COLORS } from '../lib/commonTypes';

const base = 'mr-1 mb-1 font-bold shadow hover:shadow-md';
const sizes = {
  small: 'text-xs px-4 py-2',
  regular: 'text-sm px-6 py-3',
};

const filledClasses = color => `bg-${color}-500 text-white active:bg-${color}-600 outline-none focus:outline-none`;

const outlineClasses = color => `text-${color}-500 bg-transparent border border-solid border-${color}-500 hover:bg-${color}-500 hover:text-white active:bg-${color}-600`;

const Button = ({
  children, color, rounded, filled, size, onClick, className, link,
}) => (
  <button
    className={`${base} ${rounded ? 'rounded-full' : 'rounded'} ${filled ? filledClasses(color) : outlineClasses(color)} ${sizes[size]} ${className}`}
    type="button"
    style={{ transition: 'all .15s ease' }}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  color: 'pink',
  rounded: false,
  filled: true,
  size: 'regular',
  className: '',
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
  color: PropTypes.oneOf(COLORS),
  rounded: PropTypes.bool,
  filled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'regular']),
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Button;
