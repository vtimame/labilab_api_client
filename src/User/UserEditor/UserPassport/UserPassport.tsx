import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { User, UserPassport as UserPassportType } from '../../../types';
import { FormGroup, InputGroup, TextArea } from '@blueprintjs/core';
import { DatePicker } from '../DatePicker';

interface UserPassportProps {
  user: User;
  updateUserMutation: Function;
}

export const UserPassport: FunctionComponent<UserPassportProps> = (props) => {
  const [passport, setPassport] = useState<UserPassportType>(
    props.user.passport || {
      serial: '',
      number: '',
      departmentCode: '',
      dateOfIssue: null,
      issuedBy: '',
    }
  );

  const updatePassport = () => {
    props.updateUserMutation({
      variables: { payload: { _id: props.user._id, passport } },
    });
  };

  const onDateChange = (date: Date) => {
    setPassport({ ...passport, ...{ dateOfIssue: date } });
    updatePassport();
  };

  return (
    <div className="row">
      <FormGroup label="Серия" className="col-3">
        <InputGroup
          fill
          value={String(passport.serial)}
          onBlur={updatePassport}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPassport({ ...passport, ...{ serial: event.target.value } })
          }
        />
      </FormGroup>
      <FormGroup label="Номер" className="col-3">
        <InputGroup
          fill
          value={String(passport.number)}
          onBlur={updatePassport}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPassport({ ...passport, ...{ number: event.target.value } })
          }
        />
      </FormGroup>
      <FormGroup label="Код подразделения" className="col-3">
        <InputGroup
          fill
          value={String(passport.departmentCode)}
          onBlur={updatePassport}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPassport({
              ...passport,
              ...{ departmentCode: event.target.value },
            })
          }
        />
      </FormGroup>
      <FormGroup label="Дата выдачи" className="col-3">
        <DatePicker onChange={onDateChange} value={passport.dateOfIssue} />
      </FormGroup>
      <FormGroup label="Кем выдан" className="col-12 mb-0">
        <TextArea
          fill
          value={String(passport.issuedBy)}
          onBlur={updatePassport}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setPassport({ ...passport, ...{ issuedBy: event.target.value } })
          }
        />
      </FormGroup>
    </div>
  );
};
