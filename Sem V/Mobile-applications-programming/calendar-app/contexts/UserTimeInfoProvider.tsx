import React, { createContext, ReactNode } from 'react';
import moment from 'moment-timezone';

type UserTimeInfo = {
  currentTime: Date;
  timeZone: string;
};

export const UserTimeInfoContext = createContext<UserTimeInfo | undefined>(
  undefined,
);

type UserTimeInfoProps = {
  children: ReactNode;
};

export const UserTimeInfoProvider = ({ children }: UserTimeInfoProps) => {
  const currentTime = new Date();
  const timeZone = moment.tz.guess(true);

  const timeInfo = { currentTime, timeZone };

  return (
    <UserTimeInfoContext.Provider value={timeInfo}>
      {children}
    </UserTimeInfoContext.Provider>
  );
};
