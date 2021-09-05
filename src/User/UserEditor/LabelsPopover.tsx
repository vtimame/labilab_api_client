import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { USER_PHONE_LABELS } from './UserPhones/graphql';
import { Button, InputGroup, Menu, Popover, Position } from '@blueprintjs/core';
import { CREATE_LABEL } from '../../graphql';

interface LabelsPopoverProps {
  labelsType: string;
  value: string;
  onChange: (label: string) => void;
  buttonMinimal?: boolean;
  buttonFill?: boolean;
}

export const LabelsPopover: FunctionComponent<LabelsPopoverProps> = ({
  labelsType,
  value,
  onChange,
  buttonMinimal = true,
  buttonFill = false,
}) => {
  const [newLabelName, setNewLabelName] = useState<string>('');
  const labelsQuery = useQuery(USER_PHONE_LABELS, {
    variables: { type: labelsType },
  });

  const [createLabel] = useMutation(CREATE_LABEL);

  const saveLabel = async (event: any) => {
    if (event.target.value.length > 0 && event.key === 'Enter') {
      await createLabel({
        variables: {
          payload: { type: labelsType, name: event.target.value },
        },
      });

      await labelsQuery.refetch();
      setNewLabelName('');
      event.target.blur();
    }
  };

  return (
    <Popover
      minimal
      fill={buttonFill}
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          {labelsQuery.data
            ? labelsQuery.data?.userLabels.map(
                (label: any, labelIndex: number) => {
                  return (
                    <Menu.Item
                      text={label.name}
                      key={labelIndex}
                      onClick={() => onChange(label.name)}
                    />
                  );
                }
              )
            : null}
          <Menu.Divider title="Добавить метку" />
          <div className="px-1 pt-1">
            <InputGroup
              small
              autoFocus
              value={newLabelName}
              onKeyDown={saveLabel}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewLabelName(event.target.value)
              }
            />
          </div>
        </Menu>
      }
    >
      <Button
        minimal={buttonMinimal}
        intent={'primary'}
        icon={'caret-down'}
        fill={buttonFill}
      >
        {value}
      </Button>
    </Popover>
  );
};
