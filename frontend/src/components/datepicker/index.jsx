import React from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from 'react-datetime';
// reactstrap components
import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap';

const Datepicker = props => (
  <FormGroup>
    <InputGroup className="input-group-alternative">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="ni ni-calendar-grid-58" />
        </InputGroupText>
      </InputGroupAddon>
      <ReactDatetime
        inputProps={{
          placeholder: 'YYYY-MM-DD',
        }}
        dateFormat="YYYY-MM-DD"
        timeFormat={false}
      />
    </InputGroup>
  </FormGroup>

);

Datepicker.propTypes = {

};

export default Datepicker;
