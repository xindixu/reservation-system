import React from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from 'react-datetime';

import Base from '../form/base';

const Datepicker = ({
  onChange, renderDay, dateFormat, name, title, placeholder,
}) => (
  <Base prepend={<i className="ni ni-calendar-grid-58" />} title={title}>
    <ReactDatetime
      inputProps={{
        placeholder: placeholder || dateFormat,
        name,
      }}
      dateFormat={dateFormat}
      timeFormat={false}
      onChange={onChange}
      renderDay={renderDay}
    />
  </Base>
);

Datepicker.defaultProps = {
  dateFormat: 'YYYY-MM-DD',
};

Datepicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,

};

export default Datepicker;
