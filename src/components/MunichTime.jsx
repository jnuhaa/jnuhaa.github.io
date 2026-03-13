import React, { useState, useEffect, memo } from 'react';
import { TYPOGRAPHY } from '../layouts/case-study';

const MunichTime = memo(() => {
  const [time, setTime] = useState('');
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const munichTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

      const hours = String(munichTime.getHours()).padStart(2, '0');
      const minutes = String(munichTime.getMinutes()).padStart(2, '0');
      const seconds = String(munichTime.getSeconds()).padStart(2, '0');

      setTime(`${hours}:${minutes}:${seconds}`);

      const timezoneStr = munichTime.toLocaleTimeString('en-US', { timeZone: 'Europe/Berlin', timeZoneName: 'short' });
      const tzMatch = timezoneStr.match(/\s([A-Z]{2,5})$/);
      setTimezone(tzMatch ? tzMatch[1] : 'CET');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center space-x-2 ${TYPOGRAPHY.caption} pointer-events-auto min-w-[180px]`}>
      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 flex-shrink-0" />
      <span className="flex-shrink-0">Munich</span>
      <span className="tabular-nums">{time || '--:--:--'}</span>
      <span className="text-slate-400 flex-shrink-0">{timezone || 'CET'}</span>
    </div>
  );
});

MunichTime.displayName = 'MunichTime';
export default MunichTime;
