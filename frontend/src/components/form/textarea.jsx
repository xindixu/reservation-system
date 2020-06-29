import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
} from 'reactstrap';

import Base from './base';

const Textarea = ({
  title, onChange, name, placeholder, prepend, append, rows,
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
  prepend: null,
  append: null,
  rows: 3,
};

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prepend: PropTypes.node,
  append: PropTypes.node,
  rows: PropTypes.number,
};
export default Textarea;
