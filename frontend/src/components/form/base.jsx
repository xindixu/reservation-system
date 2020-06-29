import React from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup,
  Label,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap';

const Base = ({
  children, title, name, prepend, append,
}) => (
  <FormGroup>
    <Label for={name}>{title}</Label>
    <InputGroup className="input-group-alternative">
      {prepend && (
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          {prepend}
        </InputGroupText>
      </InputGroupAddon>
      )}
      {children}
      {append && (
      <InputGroupAddon addonType="append">
        <InputGroupText>
          {append}
        </InputGroupText>
      </InputGroupAddon>
      )}
    </InputGroup>
  </FormGroup>

);

Base.defaultProps = {
  prepend: null,
  append: null,
};
Base.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prepend: PropTypes.node,
  append: PropTypes.node,
};

export default Base;
