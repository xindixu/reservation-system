import React from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from 'react-datetime';

import Base from '../form/base';

const Datepicker = ({
  onChange, renderDay, format, name, title, placeholder,
}) => (
  <Base prepend={<i className="ni ni-calendar-grid-58" />} title={title}>
    <ReactDatetime
      inputProps={{
        placeholder: placeholder || format,
        name,
      }}
      dateFormat={format}
      timeFormat={false}
      onChange={onChange}
      renderDay={renderDay}
    />
  </Base>
);

Datepicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,

};

export default Datepicker;
