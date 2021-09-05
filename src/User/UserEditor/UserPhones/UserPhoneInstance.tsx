import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { UserPhone } from '../../../types';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';
import { LabelsPopover } from '../LabelsPopover';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_PHONE } from './graphql';

interface UserPhoneInstanceProps {
  itemInstance: UserPhone;
  onCancel: () => void;
}

export const UserPhoneInstance: FunctionComponent<UserPhoneInstanceProps> = (
  props
) => {
  const [item, setItem] = useState<UserPhone>(props.itemInstance);
  const [updatePhoneInstance] = useMutation(UPDATE_USER_PHONE);

  const updatePhone = async (newInstance: UserPhone) => {
    await updatePhoneInstance({ variables: { payload: newInstance } });
    setItem(newInstance);
  };

  const onPhoneBlur = async () => {
    if (item.phone !== props.itemInstance.phone) {
      await updatePhone(item);
    }
  };

  return (
    <div className="mb-2">
      <InputGroup
        value={item.phone}
        onBlur={onPhoneBlur}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setItem({ ...item, ...{ phone: event.target.value } })
        }
        leftElement={
          <LabelsPopover
            labelsType="userPhone"
            value={item.label}
            onChange={(label: string) => updatePhone({ ...item, ...{ label } })}
          />
        }
        rightElement={
          <ButtonGroup>
            <Button
              onClick={() =>
                updatePhone({ ...item, ...{ isLogin: !item.isLogin } })
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
