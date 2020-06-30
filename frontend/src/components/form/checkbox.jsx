import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  title, name, onChange, checked,
}) => (
  <div className="custom-control custom-checkbox mb-3">
    <input
      className="custom-control-input"
      id={name}
      type="checkbox"
      onChange={() => onChange(!checked)}
      defaultChecked={checked}
    />
    <label className="custom-control-label" htmlFor={name}>
      {title}
    </label>
  </div>
);


Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default Checkbox;
