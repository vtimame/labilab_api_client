import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Scalars } from '../../../types';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/Store';
import { Button, Classes, Dialog, InputGroup } from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { CREATE_USER_SOCIAL_NETWORK } from './graphql';

interface CreateSocialNetworkDialogProps {
  userId: Scalars['ID'];
  isOpen: boolean;
  setOpen: Function;
  onSave: Function;
}

export const CreateSocialNetworkDialog: FunctionComponent<CreateSocialNetworkDialogProps> = observer(
  (props) => {
    const { app } = useStore();
    const [newSocialNetwork, setNewSocialNetwork] = useState<string>('');

    const [createSocialNetwork] = useMutation(CREATE_USER_SOCIAL_NETWORK);

    const onSave = async () => {
      const result = await createSocialNetwork({
        variables: {
          payload: {
            userId: props.userId,
            link: newSocialNetwork,
            label: 'VK',
          },
        },
      });
      setNewSocialNetwork('');
      props.setOpen(false);
      props.onSave(result?.data?.createUserSocialNetwork);
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
            Добавить социальную сеть
          </div>
          <InputGroup
            value={newSocialNetwork}
            autoFocus
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewSocialNetwork(event.target.value)
            }
            onKeyDown={onKeyDown}
            className="mb-2"
          />
          <Button
            fill
            intent={'success'}
            disabled={newSocialNetwork.length === 0}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      </Dialog>
    );
  }
);
