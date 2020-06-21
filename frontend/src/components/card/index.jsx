import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  user: {
    firstName, lastName, email, phone,
  },
}) => (
  <div className="rounded border border-gray-500 bg-yellow-100 p-5 mb-5 mr-5">
    <p className="text-lg font-medium">
      {firstName}
      {' '}
      {lastName}
    </p>
    <p>{email}</p>
    <p>{phone}</p>
  </div>
);

Card.propTypes = {

};

export default Card;
