import React, { FunctionComponent } from 'react';
import { UserHoliday } from '../../types';
import { UserHolidaysInstance } from './UserHolidaysInstance';
import { Divider } from '@blueprintjs/core';

interface UserHolidaysListProps {
  list: UserHoliday[];
  fetch: Function;
}

export const UserHolidaysList: FunctionComponent<UserHolidaysListProps> = (
  props
) => {
  return (
    <div
      className="row mt-2
    "
    >
      {props.list.length > 0
        ? props.list.map((item: UserHoliday, index: number) => {
            return (
              <div key={item._id}>
                <UserHolidaysInstance item={item} onDelete={props.fetch} />
                {index === props.list.length - 1 ? null : <Divider />}
              </div>
            );
          })
        : null}
    </div>
  );
};
