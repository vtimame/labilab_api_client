import React, { FunctionComponent, useState } from 'react';
import { Button, Callout, Spinner } from '@blueprintjs/core';
import { gql, useQuery } from '@apollo/client';
import { UserHolidaysList } from './UserHolidaysList';
import { CreateUserHolidays } from './CreateUserHolidays';

interface UserHolidaysProps {
  userId: string;
}

const USER_HOLIDAYS = gql`
  query userHolidays($userId: String!) {
    userHolidays(userId: $userId) {
      _id
      start
      end
    }
  }
`;

export const UserHolidays: FunctionComponent<UserHolidaysProps> = (props) => {
  const [newHoliday, setNewHoliday] = useState<boolean>(false);
  const holidaysQuery = useQuery(USER_HOLIDAYS, {
    variables: { userId: props.userId },
  });

  return (
    <Callout>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="bp3-heading mb-0">Отпуска</h5>
        <Button
          intent={'success'}
          minimal
          icon={'plus'}
          onClick={() => setNewHoliday(true)}
          disabled={holidaysQuery.loading}
        >
          Добавить отпуск
        </Button>
      </div>
      {holidaysQuery?.loading ? (
        <div className="d-flex justify-content-center py-3">
          <Spinner />
        </div>
      ) : (
        <div>
          <CreateUserHolidays
            userId={props.userId}
            isOpen={newHoliday}
            setIsOpen={setNewHoliday}
            fetch={holidaysQuery.refetch}
          />
          <UserHolidaysList
            list={holidaysQuery?.data?.userHolidays}
            fetch={holidaysQuery?.refetch}
          />
        </div>
      )}
    </Callout>
  );
};
