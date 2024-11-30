import React from 'react';
import PropTypes from 'prop-types';

const TimeDisplay = ({ value, label }) => {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value.toString().padStart(2, '0')}</div>
    </div>
  );
};

TimeDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
};

export default TimeDisplay