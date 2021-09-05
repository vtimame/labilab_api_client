import React, { FunctionComponent, useState } from 'react';
import { Scalars, UserPhone } from '../../../types';
import { observer } from 'mobx-react-lite';
import { UserPhoneInstance } from './UserPhoneInstance';
import { Button } from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { DELETE_USER_PHONE } from './graphql';
import { CreatePhoneDialog } from './CreatePhoneDialog';

interface UserPhonesListProps {
  phones: UserPhone[];
  userId: Scalars['ID'];
}

export const UserPhonesList: FunctionComponent<UserPhonesListProps> = observer(
  (props) => {
    const [newPhone, setNewPhone] = useState<boolean>(false);
    const [phonesList, setPhonesList] = useState<UserPhone[]>(props.phones);
    const [deletePhone] = useMutation(DELETE_USER_PHONE);

    const onCancel = async (phoneId: string) => {
      await deletePhone({ variables: { id: phoneId } });
      setPhonesList(
        phonesList.filter((phone: UserPhone) => phone._id !== phoneId)
      );
    };

    return (
      <div className="pt-2">
        {phonesList.map((item) => {
          return (
            <UserPhoneInstance
              itemInstance={item}
              key={item._id}
              onCancel={() => onCancel(item._id)}
            />
          );
        })}
        <div className="d-flex justify-content-end">
          <CreatePhoneDialog
            userId={props.userId}
            isOpen={newPhone}
            setOpen={setNewPhone}
            onSave={(newPhoneInstance: UserPhone) =>
              setPhonesList([...phonesList, newPhoneInstance])
            }
          />
          <Button
            minimal
            intent={'success'}
            icon={'plus'}
            onClick={() => setNewPhone(true)}
          >
            Добавить номер телефона
          </Button>
        </div>
      </div>
    );
  }
);
