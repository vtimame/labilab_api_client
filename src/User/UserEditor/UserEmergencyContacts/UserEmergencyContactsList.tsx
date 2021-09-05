import React, { FunctionComponent, useState } from 'react';
import { Scalars, UserEmergencyContact } from '../../../types';
import { observer } from 'mobx-react-lite';
import { Button } from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { CreateEmergencyContactDialog } from './CreateEmergencyContactDialog';
import { DELETE_USER_EMERGENCY_CONTACT } from './graphql';
import { UserEmergencyContactInstance } from './UserEmergencyContactInstance';

interface UserEmergencyContactsListProps {
  emergencyContacts: UserEmergencyContact[];
  userId: Scalars['ID'];
}

export const UserEmergencyContactsList: FunctionComponent<UserEmergencyContactsListProps> = observer(
  (props) => {
    const [newEmergencyContact, setNewEmergencyContact] = useState<boolean>(
      false
    );
    const [emergencyContactsList, setEmergencyContactsList] = useState<
      UserEmergencyContact[]
    >(props.emergencyContacts);
    const [deleteEmergencyContact] = useMutation(DELETE_USER_EMERGENCY_CONTACT);

    const onCancel = async (emergencyContactId: string) => {
      await deleteEmergencyContact({ variables: { id: emergencyContactId } });
      setEmergencyContactsList(
        emergencyContactsList.filter(
          (emergencyContact: UserEmergencyContact) =>
            emergencyContact._id !== emergencyContactId
        )
      );
    };

    return (
      <div className="pt-2">
        {emergencyContactsList.map((item) => {
          return (
            <UserEmergencyContactInstance
              key={item._id}
              itemInstance={item}
              onCancel={() => onCancel(item._id)}
            />
          );
        })}
        <div className="d-flex justify-content-end">
          <CreateEmergencyContactDialog
            userId={props.userId}
            isOpen={newEmergencyContact}
            setOpen={setNewEmergencyContact}
            onSave={(newEmergencyContactInstance: UserEmergencyContact) =>
              setEmergencyContactsList([
                ...emergencyContactsList,
                newEmergencyContactInstance,
              ])
            }
          />
          <Button
            minimal
            intent={'success'}
            icon={'plus'}
            onClick={() => setNewEmergencyContact(true)}
          >
            Добавить дополнительный контакт
          </Button>
        </div>
      </div>
    );
  }
);
