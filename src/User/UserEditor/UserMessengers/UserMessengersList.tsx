import React, { FunctionComponent, useState } from 'react';
import { Scalars, UserMessenger } from '../../../types';
import { observer } from 'mobx-react-lite';
import { Button } from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { CreateMessengerDialog } from './CreateMessengerDialog';
import { UserMessengerInstance } from './UserMessengerInstance';
import { DELETE_USER_MESSENGER } from './graphql';

interface UserMessengersListProps {
  messengers: UserMessenger[];
  userId: Scalars['ID'];
}

export const UserMessengersList: FunctionComponent<UserMessengersListProps> = observer(
  (props) => {
    const [newMessenger, setNewMessenger] = useState<boolean>(false);
    const [messengersList, setMessengersList] = useState<UserMessenger[]>(
      props.messengers
    );
    const [deleteMessenger] = useMutation(DELETE_USER_MESSENGER);

    const onCancel = async (messengerId: string) => {
      await deleteMessenger({ variables: { id: messengerId } });
      setMessengersList(
        messengersList.filter(
          (messenger: UserMessenger) => messenger._id !== messengerId
        )
      );
    };

    return (
      <div className="pt-2">
        {messengersList.map((item) => {
          return (
            <UserMessengerInstance
              key={item._id}
              itemInstance={item}
              onCancel={() => onCancel(item._id)}
            />
          );
        })}
        <div className="d-flex justify-content-end">
          <CreateMessengerDialog
            userId={props.userId}
            isOpen={newMessenger}
            setOpen={setNewMessenger}
            onSave={(newMessengerInstance: UserMessenger) =>
              setMessengersList([...messengersList, newMessengerInstance])
            }
          />
          <Button
            minimal
            intent={'success'}
            icon={'plus'}
            onClick={() => setNewMessenger(true)}
          >
            Добавить мессенджер
          </Button>
        </div>
      </div>
    );
  }
);
