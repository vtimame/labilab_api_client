import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { Scalars } from '../../../types';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/Store';
import {
  Button,
  Classes,
  Dialog,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { CREATE_USER_EMERGENCY_CONTACT } from './graphql';

interface CreateEmergencyContactDialogProps {
  userId: Scalars['ID'];
  isOpen: boolean;
  setOpen: Function;
  onSave: Function;
}

interface NewEmergencyContact {
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
}

const emptyEmergencyContact: NewEmergencyContact = {
  name: '',
  surname: '',
  patronymic: '',
  phone: '',
};

export const CreateEmergencyContactDialog: FunctionComponent<CreateEmergencyContactDialogProps> = observer(
  (props) => {
    const { app } = useStore();
    const [hasEmptyValues, setHasEmptyValues] = useState<boolean>(true);
    const [newEmergencyContact, setNewEmergencyContact] = useState<
      NewEmergencyContact
    >(emptyEmergencyContact);

    const [createEmergencyContact] = useMutation(CREATE_USER_EMERGENCY_CONTACT);

    useEffect(() => {
      // eslint-disable-next-line array-callback-return
      Object.keys(newEmergencyContact).map((key) => {
        // @ts-ignore
        setHasEmptyValues(newEmergencyContact[key].length === 0);
      });
    }, [newEmergencyContact]);

    const onSave = async () => {
      const result = await createEmergencyContact({
        variables: {
          payload: {
            userId: props.userId,
            relation: 'Родственник',
            ...newEmergencyContact,
          },
        },
      });
      setNewEmergencyContact(emptyEmergencyContact);
      props.setOpen(false);
      props.onSave(result?.data?.createUserEmergencyContact);
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
            Добавить дополнительный контакт
          </div>
          <div className="row">
            <FormGroup label="Фамилия" className="col-6 mb-0">
              <InputGroup
                value={newEmergencyContact.surname}
                autoFocus
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewEmergencyContact({
                    ...newEmergencyContact,
                    ...{ surname: event.target.value },
                  })
                }
                onKeyDown={onKeyDown}
                className="mb-2"
              />
            </FormGroup>
            <FormGroup label="Имя" className="col-6 mb-0">
              <InputGroup
                value={newEmergencyContact.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewEmergencyContact({
                    ...newEmergencyContact,
                    ...{ name: event.target.value },
                  })
                }
                onKeyDown={onKeyDown}
                className="mb-2"
              />
            </FormGroup>
            <FormGroup label="Отчество" className="col-6">
              <InputGroup
                value={newEmergencyContact.patronymic}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewEmergencyContact({
                    ...newEmergencyContact,
                    ...{ patronymic: event.target.value },
                  })
                }
                onKeyDown={onKeyDown}
                className="mb-2"
              />
            </FormGroup>
            <FormGroup label="Номер телефона" className="col-6">
              <InputGroup
                value={newEmergencyContact.phone}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewEmergencyContact({
                    ...newEmergencyContact,
                    ...{ phone: event.target.value },
                  })
                }
                onKeyDown={onKeyDown}
                className="mb-2"
              />
            </FormGroup>
          </div>
          <Button
            fill
            intent={'success'}
            disabled={hasEmptyValues}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      </Dialog>
    );
  }
);
