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

import BaseDatepicker from './base';

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


const RangeDatepicker = ({ dateFormat, onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const renderDay = (props, currentDate) => {
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
        <BaseDatepicker
          title="Start Date"
          dateFormat={dateFormat}
          renderDay={renderDay}
          onChange={(e) => {
            setStartDate(e);
            onChange({ start: e.toDate() });
          }}
        />
      </Col>
      <Col xs={6}>
        <BaseDatepicker
          title="End Date"
          dateFormat={dateFormat}
          renderDay={renderDay}
          onChange={(e) => {
            setEndDate(e);
            onChange({ end: e.toDate() });
          }}
        />
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
