import React, { FunctionComponent, useState } from 'react';
import { Scalars, UserEmail } from '../../../types';
import { useMutation } from '@apollo/client';
import { DELETE_USER_EMAIL } from './graphql';
import { Button } from '@blueprintjs/core';
import { CreateEmailsDialog } from './CreateEmailDialog';
import { UserEmailInstance } from './UserEmailInstance';

interface UserEmailsListProps {
  emails: UserEmail[];
  userId: Scalars['ID'];
}

export const UserEmailsList: FunctionComponent<UserEmailsListProps> = (
  props
) => {
  const [newEmail, setNewEmail] = useState<boolean>(false);
  const [emailsList, setEmailsList] = useState<UserEmail[]>(props.emails);
  const [deleteEmail] = useMutation(DELETE_USER_EMAIL);

  const onCancel = async (emailId: string) => {
    await deleteEmail({ variables: { id: emailId } });
    setEmailsList(
      emailsList.filter((email: UserEmail) => email._id !== emailId)
    );
  };

  return (
    <div className="pt-2">
      {emailsList.map((item) => {
        return (
          <UserEmailInstance
            key={item._id}
            itemInstance={item}
            onCancel={() => onCancel(item._id)}
          />
        );
      })}
      <div className="d-flex justify-content-end">
        <CreateEmailsDialog
          userId={props.userId}
          isOpen={newEmail}
          setOpen={setNewEmail}
          onSave={(newEmailInstance: UserEmail) =>
            setEmailsList([...emailsList, newEmailInstance])
          }
        />
        <Button
          minimal
          intent={'success'}
          icon={'plus'}
          onClick={() => setNewEmail(true)}
        >
          Добавить почтовый адрес
        </Button>
      </div>
    </div>
  );
};
