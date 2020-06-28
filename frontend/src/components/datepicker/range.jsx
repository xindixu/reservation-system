import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ReactDatetime from 'react-datetime';

import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
} from 'reactstrap';


const getClasses = (className, startDate, endDate, currentDate) => {
  if (
    startDate && endDate
    && currentDate.isSame(startDate)
  ) {
    return `${className} start-date`;
  }

  if (
    startDate
    && endDate
    && currentDate.isAfter(startDate)
    && currentDate.isBefore(endDate)
  ) {
    return `${className} middle-date`;
  }

  if (
    startDate && endDate && currentDate.isSame(endDate)
  ) {
    return `${className} end-date`;
  }

  return className;
};


const RangeDatepicker = ({ dateFormat }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const renderDay = (props, currentDate, selectedDate) => {
    const classes = getClasses(props.className, startDate, endDate, currentDate);
    return (
      <td {...props} className={classes}>
        {currentDate.date()}
      </td>
    );
  };


  return (

    <Row>
      <Col xs={6}>
        <FormGroup>
          Start Date
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-calendar-grid-58" />
              </InputGroupText>
            </InputGroupAddon>
            <ReactDatetime
              inputProps={{
                placeholder: 'Date Picker Here',
              }}
              timeFormat={false}
              dateFormat={dateFormat}
              renderDay={renderDay}
              onChange={setStartDate}
            />
          </InputGroup>
        </FormGroup>
      </Col>
      <Col xs={6}>
        <FormGroup>
          End Date
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-calendar-grid-58" />
              </InputGroupText>
            </InputGroupAddon>
            <ReactDatetime
              inputProps={{
                placeholder: 'Date Picker Here',
              }}
              timeFormat={false}
              dateFormat={dateFormat}
              renderDay={renderDay}
              onChange={setEndDate}
            />
          </InputGroup>
        </FormGroup>
      </Col>
    </Row>
  );
};

RangeDatepicker.defaultProps = {
  dateFormat: 'YYYY-MM-DD',
};

RangeDatepicker.propTypes = {
  dateFormat: PropTypes.string,
};

export default RangeDatepicker;
