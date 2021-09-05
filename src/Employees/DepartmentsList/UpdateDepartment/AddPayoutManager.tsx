import React, { FunctionComponent, useState } from 'react';
import { DepartmentPayoutManager, User } from '../../../types';
import { Button, Collapse, MenuItem } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';

interface AddPayoutManagerProps {
  users: User[];
  managers: DepartmentPayoutManager[];
  isOpen: boolean;
  setOpen: Function;
  onNewManagerSelected: Function;
}

export const AddPayoutManager: FunctionComponent<AddPayoutManagerProps> = (
  props
) => {
  const [usersList, setUsersList] = useState(props.users);

  const onQueryChange = (query: string) => {
    if (query.length > 0) {
      setUsersList(
        props.users.filter(
          (user: User) =>
            user.surname.toLowerCase().startsWith(query.toLowerCase()) ||
            user.name.toLowerCase().startsWith(query.toLowerCase())
        )
      );
    } else setUsersList(props.users);
  };

  const renderSuggestionSelect = (users: User[]) => {
    return (
      <Suggest
        fill
        popoverProps={{ minimal: true, fill: true }}
        inputValueRenderer={(item: User) => `${item.surname} ${item.name}`}
        itemRenderer={(item: User) => {
          return (
            <MenuItem
              key={item._id}
              text={`${item.surname} ${item.name}`}
              onClick={() => props.onNewManagerSelected(item)}
            />
          );
        }}
        items={users}
        onItemSelect={() => {}}
        onQueryChange={onQueryChange}
      />
    );
  };

  return (
    <div>
      <Collapse isOpen={props.isOpen}>
        {renderSuggestionSelect(usersList)}
        <div className="d-flex justify-content-end my-2">
          <Button
            small
            intent={'danger'}
            minimal
            onClick={() => props.setOpen(false)}
          >
            Отмена
          </Button>
        </div>
      </Collapse>
    </div>
  );
};
