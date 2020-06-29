import React from 'react';
import PropTypes from 'prop-types';

import {
  Input,
} from 'reactstrap';

import Base from './base';

const Textbox = ({
  title, onChange, name, type, placeholder, prepend, append,
}) => (
  <Base title={title} prepend={prepend} append={append}>
    <Input className="form-control-alternative" type={type} name={name} placeholder={placeholder} onChange={onChange} />
  </Base>
);


Textbox.defaultProps = {
  placeholder: '',
  prepend: null,
  append: null,
};
Textbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prepend: PropTypes.node,
  append: PropTypes.node,
};
export default Textbox;
