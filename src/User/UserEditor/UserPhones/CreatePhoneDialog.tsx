import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Scalars } from '../../../types';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/Store';
import { Button, Classes, Dialog, InputGroup } from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { CREATE_USER_PHONE } from './graphql';

interface CreatePhoneDialogProps {
  userId: Scalars['ID'];
  isOpen: boolean;
  setOpen: Function;
  onSave: Function;
}

export const CreatePhoneDialog: FunctionComponent<CreatePhoneDialogProps> = observer(
  (props) => {
    const { app } = useStore();
    const [newPhone, setNewPhone] = useState<string>('');

    const [createPhone] = useMutation(CREATE_USER_PHONE);

    const onSave = async () => {
      const result = await createPhone({
        variables: {
          payload: { userId: props.userId, phone: newPhone, label: 'Рабочий' },
        },
      });
      setNewPhone('');
      props.setOpen(false);
      props.onSave(result?.data?.createUserPhone);
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
            Добавить номер телефона
          </div>
          <InputGroup
            value={newPhone}
            autoFocus
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewPhone(event.target.value)
            }
            onKeyDown={onKeyDown}
            className="mb-2"
          />
          <Button
            fill
            intent={'success'}
            disabled={newPhone.length === 0}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      </Dialog>
    );
  }
);
