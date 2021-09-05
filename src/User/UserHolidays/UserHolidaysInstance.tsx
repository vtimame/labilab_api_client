import React, { FunctionComponent } from 'react';
import { UserHoliday } from '../../types';
import { gql, useMutation } from '@apollo/client';
import { Button, ControlGroup } from '@blueprintjs/core';
import { DatePicker } from '../UserEditor/DatePicker';

interface UserHolidaysInstanceProps {
  item: UserHoliday;
  onDelete: Function;
}

export const UserHolidaysInstance: FunctionComponent<UserHolidaysInstanceProps> = (
  props
) => {
  const [updateHolidays] = useMutation(gql`
    mutation updateHolidays($payload: UpdateUserHolidayDto!) {
      updateUserHoliday(payload: $payload) {
        _id
      }
    }
  `);

  const [deleteHolidays] = useMutation(gql`
    mutation updateHolidays($id: String!) {
      deleteUserHoliday(_id: $id) {
        _id
      }
    }
  `);

  const updateHolidaysInstance = async (property: string, date: Date) => {
    await updateHolidays({
      variables: { payload: { _id: props.item._id, [property]: date } },
    });
  };

  const deleteHolidaysInstance = async () => {
    await deleteHolidays({ variables: { id: props.item._id } });
    props.onDelete();
  };

  return (
    <div>
      <ControlGroup>
        <DatePicker
          onChange={(date: Date) => updateHolidaysInstance('start', date)}
          value={props.item.start}
        />
        <DatePicker
          onChange={(date: Date) => updateHolidaysInstance('end', date)}
          value={props.item.end}
        />
        <Button
          intent={'danger'}
          icon={'minus'}
          onClick={deleteHolidaysInstance}
        />
      </ControlGroup>
    </div>
  );
};
