import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { BASE_INPUT } from '../../lib/commonTypes';

import Base from './base';

const Textarea = ({
  title, name, prepend, append, onChange, placeholder, rows,
}) => (
  <Base title={title} prepend={prepend} append={append}>
    <Input
      name={name}
      className="form-control-alternative"
      placeholder={placeholder}
      rows={rows}
      type="textarea"
      onChange={onChange}
    />
  </Base>
);

Textarea.defaultProps = {
  placeholder: '',
  rows: 3,
};

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  rows: PropTypes.number,
  ...BASE_INPUT,
};
export default Textarea;
