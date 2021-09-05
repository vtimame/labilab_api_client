import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';
import { LabelsPopover } from '../LabelsPopover';
import { useMutation } from '@apollo/client';
import { UserMessenger } from '../../../types';
import { UPDATE_USER_MESSENGER } from './graphql';

interface UserMessengerInstanceProps {
  itemInstance: UserMessenger;
  onCancel: () => void;
}

export const UserMessengerInstance: FunctionComponent<UserMessengerInstanceProps> = (
  props
) => {
  const [item, setItem] = useState<UserMessenger>(props.itemInstance);
  const [updateMessengerInstance] = useMutation(UPDATE_USER_MESSENGER);

  const updateMessenger = async (newInstance: UserMessenger) => {
    await updateMessengerInstance({ variables: { payload: newInstance } });
    setItem(newInstance);
  };

  const onMessengerBlur = async () => {
    if (item.nickname !== props.itemInstance.nickname) {
      await updateMessenger(item);
    }
  };

  return (
    <div className="mb-2">
      <InputGroup
        value={item.nickname}
        onBlur={onMessengerBlur}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setItem({ ...item, ...{ link: event.target.value } })
        }
        leftElement={
          <LabelsPopover
            labelsType="userMessenger"
            value={item.label}
            onChange={(label: string) =>
              updateMessenger({ ...item, ...{ label } })
            }
          />
        }
        rightElement={
          <ButtonGroup>
            <Button
              intent={'danger'}
              minimal
              icon={'minus'}
              onClick={props.onCancel}
            />
          </ButtonGroup>
        }
      />
    </div>
  );
};
