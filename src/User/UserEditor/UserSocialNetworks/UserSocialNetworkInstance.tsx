import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';
import { LabelsPopover } from '../LabelsPopover';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_SOCIAL_NETWORK } from './graphql';
import { UserSocialNetwork } from '../../../types';

interface UserSocialNetworkInstanceProps {
  itemInstance: UserSocialNetwork;
  onCancel: () => void;
}

export const UserSocialNetworkInstance: FunctionComponent<UserSocialNetworkInstanceProps> = (
  props
) => {
  const [item, setItem] = useState<UserSocialNetwork>(props.itemInstance);
  const [updateSocialNetworkInstance] = useMutation(UPDATE_USER_SOCIAL_NETWORK);

  const updateSocialNetwork = async (newInstance: UserSocialNetwork) => {
    await updateSocialNetworkInstance({ variables: { payload: newInstance } });
    setItem(newInstance);
  };

  const onSocialNetworkBlur = async () => {
    if (item.link !== props.itemInstance.link) {
      await updateSocialNetwork(item);
    }
  };

  return (
    <div className="mb-2">
      <InputGroup
        value={item.link}
        onBlur={onSocialNetworkBlur}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setItem({ ...item, ...{ link: event.target.value } })
        }
        leftElement={
          <LabelsPopover
            labelsType="userSocialNetwork"
            value={item.label}
            onChange={(label: string) =>
              updateSocialNetwork({ ...item, ...{ label } })
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
