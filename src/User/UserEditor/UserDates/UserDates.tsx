import React, { FunctionComponent } from 'react';
import { User } from '../../../types';
import { DatePicker } from '../DatePicker';
import { FormGroup } from '@blueprintjs/core';

interface UserDatesProps {
  user: User;
  updateUserMutation: any;
}

export const UserDates: FunctionComponent<UserDatesProps> = (props) => {
  return (
    <div className="row">
      <FormGroup label="Дата рождения" className="col-4">
        <DatePicker
          onChange={(selectedDate) =>
            props.updateUserMutation({
              variables: {
                payload: { _id: props.user._id, birthday: selectedDate },
              },
            })
          }
          value={props.user.birthday}
          placeholder="Введите дату рождения"
        />
      </FormGroup>
      <FormGroup label="Дата зачисления на работу" className="col-4">
        <DatePicker
          onChange={(selectedDate) =>
            props.updateUserMutation({
              variables: {
                payload: { _id: props.user._id, employmentAt: selectedDate },
              },
            })
          }
          value={props.user.employmentAt}
          placeholder="Введите дату зачисления на работу"
        />
      </FormGroup>
      <FormGroup label="Дата увольнения" className="col-4">
        <DatePicker
          onChange={(selectedDate) =>
            props.updateUserMutation({
              variables: {
                payload: { _id: props.user._id, dismissalAt: selectedDate },
              },
            })
          }
          value={props.user.dismissalAt}
          placeholder="Введите дату увольнения"
        />
      </FormGroup>
    </div>
  );
};
