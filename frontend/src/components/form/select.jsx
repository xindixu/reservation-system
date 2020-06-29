import React from 'react';
import PropTypes from 'prop-types';
import BaseSelect from 'react-select';
import { BASE_INPUT } from '../../lib/commonTypes';
import Base from './base';


const Select = ({
  title, name, onChange, placeholder, options, isMulti,
}) => (
  <Base title={title}>
    <BaseSelect
      placeholder={placeholder}
      name={name}
      options={options}
      className="input-group-alternative"
      classNamePrefix="form-control-alternative"
      isClearable
      isSearchable
      isMulti={isMulti}
      onChange={onChange}
    />
  </Base>
);

Select.defaultProps = {
  placeholder: '',
  isMulti: false,
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  ...BASE_INPUT,
};
export default Select;
