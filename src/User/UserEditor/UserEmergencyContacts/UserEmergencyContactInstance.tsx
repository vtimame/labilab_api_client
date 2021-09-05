import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Button, ControlGroup, InputGroup } from '@blueprintjs/core';
import { LabelsPopover } from '../LabelsPopover';
import { useMutation } from '@apollo/client';
import { UserEmergencyContact } from '../../../types';
import { UPDATE_USER_EMERGENCY_CONTACT } from './graphql';

interface UserEmergencyContactInstanceProps {
  itemInstance: UserEmergencyContact;
  onCancel: () => void;
}

export const UserEmergencyContactInstance: FunctionComponent<UserEmergencyContactInstanceProps> = (
  props
) => {
  const [item, setItem] = useState<UserEmergencyContact>(props.itemInstance);
  const [updateEmergencyContactInstance] = useMutation(
    UPDATE_USER_EMERGENCY_CONTACT
  );

  const updateEmergencyContact = async (newInstance: UserEmergencyContact) => {
    await updateEmergencyContactInstance({
      variables: { payload: newInstance },
    });
    setItem(newInstance);
  };

  const onInputBlur = async (property: string, value: string) => {
    // @ts-ignore
    if (item[property] !== props.itemInstance[property]) {
      await updateEmergencyContact({
        ...item,
        ...{ [property]: value },
      });
    }
  };

  return (
    <div className="mb-2 d-flex">
      <div className="pr-2" style={{ flex: 1 }}>
        <LabelsPopover
          labelsType="userEmergencyContact"
          value={item.relation}
          buttonMinimal={false}
          buttonFill={true}
          onChange={(relation: string) =>
            updateEmergencyContact({ ...item, ...{ relation } })
          }
        />
      </div>
      <ControlGroup fill vertical={false} style={{ flex: 5 }}>
        <InputGroup
          value={item.surname}
          placeholder="Фамилия"
          onBlur={(event) => onInputBlur('surname', event.target.value)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setItem({ ...item, ...{ surname: event.target.value } });
          }}
        />
        <InputGroup
          value={item.name}
          placeholder="Имя"
          onBlur={(event) => onInputBlur('name', event.target.value)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setItem({ ...item, ...{ name: event.target.value } });
          }}
        />
        <InputGroup
          value={item.patronymic}
          placeholder="Отчество"
          onBlur={(event) => onInputBlur('patronymic', event.target.value)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setItem({ ...item, ...{ patronymic: event.target.value } });
          }}
        />
        <InputGroup
          value={item.phone}
          placeholder="Номер телефона"
          onBlur={(event) => onInputBlur('phone', event.target.value)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setItem({ ...item, ...{ phone: event.target.value } });
          }}
        />
        <Button intent={'danger'} icon={'minus'} onClick={props.onCancel} />
      </ControlGroup>
    </div>
  );
};
