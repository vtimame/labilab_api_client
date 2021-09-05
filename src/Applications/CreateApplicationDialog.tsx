import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from 'react';
import { useStore } from '../store/Store';
import {
  Button,
  Classes,
  Dialog,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';
import { CreateApplicationDto } from '../types';
import { gql, useMutation } from '@apollo/client';

interface CreateApplicationDialogProps {
  onCreate: () => void;
}

const newApplication: CreateApplicationDto = {
  name: '',
  url: '',
};

export const CreateApplicationDialog: FunctionComponent<CreateApplicationDialogProps> = (
  props
) => {
  const { app } = useStore();
  const [createApplication, setCreateApplication] = useState<boolean>(false);
  const [newApplicationInstance, setNewApplicationInstance] = useState<
    CreateApplicationDto
  >(newApplication);

  const [createApplicationMutation] = useMutation(gql`
    mutation createApplication($payload: CreateApplicationDto!) {
      createAuthApplication(payload: $payload) {
        _id
      }
    }
  `);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createApplicationMutation({
      variables: { payload: newApplicationInstance },
    });

    setNewApplicationInstance(newApplication);
    setCreateApplication(false);
    props.onCreate();
  };

  return (
    <div>
      <Button
        minimal
        intent={'success'}
        icon={'plus'}
        onClick={() => setCreateApplication(true)}
      >
        Добавить приложение
      </Button>

      <Dialog
        isOpen={createApplication}
        onClose={() => setCreateApplication(false)}
        className={`${app.isDark ? Classes.DARK : ''} pb-0`}
      >
        <div className={Classes.DIALOG_BODY}>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }} className="mb-3">
            Добавить приложение
          </div>
          <form className="row" onSubmit={onSubmit}>
            <FormGroup className="col-6" label="Название приложения">
              <InputGroup
                autoFocus
                value={newApplicationInstance.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewApplicationInstance({
                    ...newApplicationInstance,
                    ...{ name: event.target.value },
                  })
                }
              />
            </FormGroup>
            <FormGroup className="col-6" label="Url приложения">
              <InputGroup
                value={newApplicationInstance.url}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewApplicationInstance({
                    ...newApplicationInstance,
                    ...{ url: event.target.value },
                  })
                }
              />
            </FormGroup>
            <div className="col-12">
              <Button
                intent={'success'}
                fill
                type={'submit'}
                disabled={
                  newApplicationInstance.name.length === 0 ||
                  newApplicationInstance.url.length === 0
                }
              >
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};
