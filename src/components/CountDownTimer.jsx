import React from 'react';
import TimeDisplay from './TimeDisplay';

export const CountdownTimer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex gap-4">
      <TimeDisplay value={days} label="Days" />
      <div className="text-2xl font-bold">:</div>
      <TimeDisplay value={hours} label="Hours" />
      <div className="text-2xl font-bold">:</div>
      <TimeDisplay value={minutes} label="Minutes" />
      <div className="text-2xl font-bold">:</div>
      <TimeDisplay value={seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;