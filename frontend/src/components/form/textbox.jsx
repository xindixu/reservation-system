import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { BASE_INPUT } from '../../lib/commonTypes';
import Base from './base';

const Textbox = ({
  title, name, prepend, append, onChange, type, placeholder,
}) => (
  <Base title={title} prepend={prepend} append={append}>
    <Input className="form-control-alternative" type={type} name={name} placeholder={placeholder} onChange={onChange} />
  </Base>
);


Textbox.defaultProps = {
  placeholder: '',
};
Textbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  ...BASE_INPUT,
};
export default Textbox;
