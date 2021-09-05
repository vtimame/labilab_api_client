import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Scalars } from '../../../types';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/Store';
import { Button, Classes, Dialog, InputGroup } from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MESSENGER } from './graphql';

interface CreateMessengerDialogProps {
  userId: Scalars['ID'];
  isOpen: boolean;
  setOpen: Function;
  onSave: Function;
}

export const CreateMessengerDialog: FunctionComponent<CreateMessengerDialogProps> = observer(
  (props) => {
    const { app } = useStore();
    const [newMessenger, setNewMessenger] = useState<string>('');

    const [createMessenger] = useMutation(CREATE_USER_MESSENGER);

    const onSave = async () => {
      const result = await createMessenger({
        variables: {
          payload: {
            userId: props.userId,
            nickname: newMessenger,
            label: 'Telegram',
          },
        },
      });
      setNewMessenger('');
      props.setOpen(false);
      props.onSave(result?.data?.createUserMessenger);
    };

    const onKeyDown = async (event: any) => {
      if (event.key === 'Enter' && event.target.value.length > 0) {
        await onSave();
      }
    };

    return (
      <Dialog
        isOpen={props.isOpen}
        onClose={() => props.setOpen(false)}
        className={`${app.isDark ? Classes.DARK : ''} pb-0`}
      >
        <div className={Classes.DIALOG_BODY}>
          <div style={{ fontWeight: 600 }} className="mb-2">
            Добавить мессенджер
          </div>
          <InputGroup
            value={newMessenger}
            autoFocus
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewMessenger(event.target.value)
            }
            onKeyDown={onKeyDown}
            className="mb-2"
          />
          <Button
            fill
            intent={'success'}
            disabled={newMessenger.length === 0}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      </Dialog>
    );
  }
);
