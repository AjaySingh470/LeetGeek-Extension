import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(5);
    targetTime.setMinutes(30);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);

    // If the target time for the current day has passed, set it for the next day
    if (now >= targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const difference = targetTime - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (!timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds) {
    // If the countdown has expired, reset the timer for the next day
    setTimeLeft(calculateTimeLeft());
  }

  return (
    <div>
      <div> {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')}  : {String(timeLeft.seconds).padStart(2, '0')}</div>
    </div>
  );
};

export default CountdownTimer;
