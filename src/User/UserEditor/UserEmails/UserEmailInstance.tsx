import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { UserEmail } from '../../../types';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';
import { LabelsPopover } from '../LabelsPopover';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_EMAIL } from './graphql';

interface UserEmailInstanceProps {
  itemInstance: UserEmail;
  onCancel: () => void;
}

export const UserEmailInstance: FunctionComponent<UserEmailInstanceProps> = (
  props
) => {
  const [item, setItem] = useState<UserEmail>(props.itemInstance);
  const [updateEmailInstance] = useMutation(UPDATE_USER_EMAIL);

  const updateEmail = async (newInstance: UserEmail) => {
    await updateEmailInstance({ variables: { payload: newInstance } });
    setItem(newInstance);
  };

  const onEmailBlur = async () => {
    if (item.email !== props.itemInstance.email) {
      await updateEmail(item);
    }
  };

  return (
    <div className="mb-2">
      <InputGroup
        value={item.email}
        onBlur={onEmailBlur}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setItem({ ...item, ...{ email: event.target.value } })
        }
        leftElement={
          <LabelsPopover
            labelsType="userEmail"
            value={item.label}
            onChange={(label: string) => updateEmail({ ...item, ...{ label } })}
          />
        }
        rightElement={
          <ButtonGroup>
            <Button
              onClick={() =>
                updateEmail({ ...item, ...{ isLogin: !item.isLogin } })
              }
              intent={item.isLogin ? 'success' : 'none'}
              active={item.isLogin}
              minimal
            >
              Использовать в качестве логина
            </Button>
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
