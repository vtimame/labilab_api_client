import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { User } from '../../../types';
import { FormGroup, InputGroup } from '@blueprintjs/core';

interface UserFinanceProps {
  user: User;
  updateUserMutation: Function;
}

export const UserFinance: FunctionComponent<UserFinanceProps> = (props) => {
  const [finance, setFinance] = useState({
    inn: props.user.inn || '',
    snils: props.user.snils || '',
    bik: props.user.bik || '',
    correspondentAccount: props.user.correspondentAccount || '',
    checkingAccount: props.user.checkingAccount || '',
    kpp: props.user.kpp || '',
  });

  return (
    <div className="row">
      <FormGroup label="ИНН" className="col-6 mb-0">
        <InputGroup
          fill
          value={finance.inn}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFinance({
              ...finance,
              ...{ inn: event.target.value },
            })
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            props.updateUserMutation({
              variables: {
                payload: {
                  _id: props.user._id,
                  inn: event.target.value,
                },
              },
            })
          }
        />
      </FormGroup>
      <FormGroup label="Снилс" className="col-6 mb-0">
        <InputGroup
          fill
          value={finance.snils}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFinance({
              ...finance,
              ...{ snils: event.target.value },
            })
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            props.updateUserMutation({
              variables: {
                payload: {
                  _id: props.user._id,
                  snils: event.target.value,
                },
              },
            })
          }
        />
      </FormGroup>
      <FormGroup label="БИК" className="col-6 mb-0">
        <InputGroup
          fill
          value={finance.bik}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFinance({
              ...finance,
              ...{ bik: event.target.value },
            })
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            props.updateUserMutation({
              variables: {
                payload: {
                  _id: props.user._id,
                  bik: event.target.value,
                },
              },
            })
          }
        />
      </FormGroup>
      <FormGroup label="КПП" className="col-6 mb-0">
        <InputGroup
          fill
          value={finance.kpp}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFinance({
              ...finance,
              ...{ kpp: event.target.value },
            })
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            props.updateUserMutation({
              variables: {
                payload: {
                  _id: props.user._id,
                  kpp: event.target.value,
                },
              },
            })
          }
        />
      </FormGroup>
      <FormGroup label="Корреспондентский счет" className="col-6 mb-0">
        <InputGroup
          fill
          value={finance.correspondentAccount}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFinance({
              ...finance,
              ...{ correspondentAccount: event.target.value },
            })
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            props.updateUserMutation({
              variables: {
                payload: {
                  _id: props.user._id,
                  correspondentAccount: event.target.value,
                },
              },
            })
          }
        />
      </FormGroup>
      <FormGroup label="Расчетный счет" className="col-6 mb-0">
        <InputGroup
          fill
          value={finance.checkingAccount}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFinance({
              ...finance,
              ...{ checkingAccount: event.target.value },
            })
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            props.updateUserMutation({
              variables: {
                payload: {
                  _id: props.user._id,
                  checkingAccount: event.target.value,
                },
              },
            })
          }
        />
      </FormGroup>
    </div>
  );
};
