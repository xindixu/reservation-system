import React from 'react';
import {
  FormGroup,
  Label,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap';
import { BASE_INPUT } from '../../lib/commonTypes';

const Base = ({
  children, title, name, prepend, append,
}) => (
  <FormGroup>
    <Label htmlFor={name}>{title}</Label>
    { prepend || append ? (
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
    )
      : children

  }
  </FormGroup>

);

Base.defaultProps = {
  prepend: null,
  append: null,
};
Base.propTypes = {
  ...BASE_INPUT,
};

export default Base;
