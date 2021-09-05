import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Scalars } from '../../../types';
import { observer } from 'mobx-react-lite';
import { Button, Classes, Dialog, InputGroup } from '@blueprintjs/core';
import { useStore } from '../../../store/Store';
import { useMutation } from '@apollo/client';
import { CREATE_USER_EMAIL } from './graphql';

interface CreateEmailDialogProps {
  userId: Scalars['ID'];
  isOpen: boolean;
  setOpen: Function;
  onSave: Function;
}

export const CreateEmailsDialog: FunctionComponent<CreateEmailDialogProps> = observer(
  (props) => {
    const { app } = useStore();
    const [newEmail, setNewEmail] = useState<string>('');

    const [createEmail] = useMutation(CREATE_USER_EMAIL);

    const onSave = async () => {
      const result = await createEmail({
        variables: {
          payload: { userId: props.userId, email: newEmail, label: 'Рабочий' },
        },
      });
      setNewEmail('');
      props.setOpen(false);
      props.onSave(result?.data?.createUserEmail);
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
            Добавить почтовый адрес
          </div>
          <InputGroup
            value={newEmail}
            autoFocus
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewEmail(event.target.value)
            }
            onKeyDown={onKeyDown}
            className="mb-2"
          />
          <Button
            fill
            intent={'success'}
            disabled={newEmail.length === 0}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      </Dialog>
    );
  }
);
