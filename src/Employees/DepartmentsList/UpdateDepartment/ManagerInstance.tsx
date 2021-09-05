import React, { FunctionComponent, useState } from 'react';
import { DepartmentPayoutManager, Maybe } from '../../../types';
import {
  Button,
  ButtonGroup,
  Callout,
  Collapse,
  FormGroup,
  MenuItem,
} from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';
import { gql, useMutation } from '@apollo/client';

interface ManagerInstanceProps {
  editableManager: DepartmentPayoutManager;
  onDelete: () => void;
}

const selectItems = [
  {
    label: 'Аванс',
    key: 'prepaid',
  },
  { label: 'Сотовая', key: 'cellular' },
  { label: 'Иные', key: 'otherPayouts' },
  { label: 'Премия', key: 'prize' },
  { label: 'Компенсации', key: 'compensation' },
  { label: 'Наработка', key: 'overtime' },
  { label: 'Зарплата', key: 'salary' },
  { label: '5 число', key: 'firstHalf' },
  { label: '20 число', key: 'secondHalf' },
  { label: 'К выдаче', key: 'toIssue' },
  { label: 'Комментарий', key: 'comment' },
];

const UPDATE_MANAGER = gql`
  mutation updateManager($payload: UpdateDepartmentPayoutManagerDto!) {
    updateDepartmentPayoutManager(payload: $payload) {
      _id
    }
  }
`;

export const ManagerInstance: FunctionComponent<ManagerInstanceProps> = (
  props
) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [manager, setManager] = useState(props.editableManager);
  const [updateManagerMutation] = useMutation(UPDATE_MANAGER);

  const getSelectedItems = (listName: string) => {
    const items: any[] = [];
    const list =
      listName === 'readFields' ? manager.readFields : manager.writeFields;
    list.forEach((item) => {
      const selectItem = selectItems.find((el) => el.key === item);
      if (selectItem) items.push(selectItem);
    });
    return items;
  };

  const getList = (listName: string) => {
    if (listName === 'readFields') return [...manager.readFields];
    return [...manager.writeFields];
  };

  const updateList = async (listName: string, list: Maybe<string>[]) => {
    setManager({ ...manager, ...{ [listName]: list } });
    await updateManagerMutation({
      variables: { payload: { _id: manager._id, [listName]: list } },
    });
  };

  const onItemSelect = async (item: any, listName: string) => {
    let list: Maybe<string>[] = getList(listName);

    if (item.addAll) {
      list = selectItems.map((el) => el.key);
      await updateList(listName, list);
      return false;
    }

    const selectedItem = list.find((el: any) => el === item.key);
    if (!selectedItem) {
      list.push(item.key);
      await updateList(listName, list);
    }
  };

  const clearButton = (listName: string) => (
    <Button minimal icon={'cross'} onClick={() => handleClear(listName)} />
  );

  const handleClear = async (listName: string) => {
    await updateList(listName, []);
  };

  const onTagRemove = async (listName: string, index: number) => {
    const list: Maybe<string>[] = getList(listName);
    list.splice(index, 1);
    await updateList(listName, list);
  };

  const getMultiselectItems = (listName: string) => {
    const list: Maybe<string>[] = getList(listName);
    const filteredItems = selectItems.filter(
      (item) => list.find((el) => el === item.key) === undefined
    );
    if (filteredItems.length === 0) return [];
    return [{ label: 'Добавить все', key: '', addAll: true }, ...filteredItems];
  };

  const renderMultiSelect = (listName: string) => {
    return (
      <FormGroup
        label={listName === 'readFields' ? 'Чтение' : 'Запись'}
        className="mb-0"
      >
        <MultiSelect
          fill
          popoverProps={{ minimal: true }}
          placeholder={'Выберите поле'}
          selectedItems={getSelectedItems(listName)}
          tagInputProps={{
            tagProps: { intent: 'success', minimal: true },
            rightElement: clearButton(listName),
            onRemove: (_tag: React.ReactNode, index: number) =>
              onTagRemove(listName, index),
          }}
          itemRenderer={(item, itemProps) => (
            <MenuItem
              key={item.key}
              text={item.label}
              onClick={itemProps.handleClick}
              intent={item.addAll ? 'success' : 'none'}
            />
          )}
          onItemSelect={(item) => onItemSelect(item, listName)}
          items={getMultiselectItems(listName)}
          tagRenderer={(item) => item.label}
        />
      </FormGroup>
    );
  };

  return (
    <Callout>
      <div className="d-flex align-items-center justify-content-between">
        <div style={{ fontWeight: 600, fontSize: '1rem' }}>
          {manager.user.surname} {manager.user.name}
        </div>
        <ButtonGroup>
          <Button
            minimal
            small
            icon={opened ? 'caret-up' : 'caret-down'}
            onClick={() => setOpened(!opened)}
          />
          <Button
            intent={'danger'}
            minimal
            small
            icon={'minus'}
            onClick={() => props.onDelete()}
          />
        </ButtonGroup>
      </div>
      <Collapse isOpen={opened}>
        {renderMultiSelect('readFields')}
        <div className="mb-2" />
        {renderMultiSelect('writeFields')}
      </Collapse>
    </Callout>
  );
};
