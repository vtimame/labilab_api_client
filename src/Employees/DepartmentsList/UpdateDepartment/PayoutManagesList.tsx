import React, { FunctionComponent, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { DepartmentPayoutManager, User } from '../../../types';
import { Button, Divider } from '@blueprintjs/core';
import { AddPayoutManager } from './AddPayoutManager';
import { ManagerInstance } from './ManagerInstance';

interface PayoutManagesListProps {
  departmentId?: string;
}

const PAYOUT_MANAGERS = gql`
  query payoutManagers($departmentId: String!) {
    departmentPayoutManagers(payload: { departmentId: $departmentId }) {
      _id
      readFields
      writeFields
      userId
      user {
        name
        surname
        role {
          name
        }
        avatar {
          link
        }
      }
    }
  }
`;

const CREATE_MANAGER = gql`
  mutation createManager($payload: CreateDepartmentPayoutManagerDto!) {
    createDepartmentPayoutManager(payload: $payload) {
      _id
    }
  }
`;

const USERS = gql`
  query {
    users {
      _id
      name
      surname
    }
  }
`;

const DELETE_MANAGER = gql`
  mutation deleteManager($_id: String!) {
    deleteDepartmentPayoutManager(_id: $_id) {
      _id
    }
  }
`;

export const PayoutManagersList: FunctionComponent<PayoutManagesListProps> = (
  props
) => {
  const [newManagerState, setNewManagerState] = useState<boolean>(false);
  const usersQuery = useQuery(USERS);
  const [createManager] = useMutation(CREATE_MANAGER);
  const [deleteManager] = useMutation(DELETE_MANAGER);
  const managersQuery = useQuery(PAYOUT_MANAGERS, {
    variables: { departmentId: props.departmentId },
  });

  const onDeleteManager = async (_id: string) => {
    await deleteManager({ variables: { _id } });
    await managersQuery.refetch();
  };

  const onNewManagerSelected = async (user: User) => {
    await createManager({
      variables: {
        payload: {
          userId: user._id,
          departmentId: props.departmentId,
          readFields: [],
          writeFields: [],
        },
      },
    });
    await managersQuery.refetch();
    setNewManagerState(false);
  };

  const getPotentialUsers = (
    users: User[],
    managers: DepartmentPayoutManager[]
  ) => {
    const managerIds = managers.map((el) => el.userId);
    return users.filter((user) => {
      return managerIds.find((id) => id === user._id) === undefined;
    });
  };

  const renderManagersList = () => {
    const managers: DepartmentPayoutManager[] =
      managersQuery.data?.departmentPayoutManagers;

    return (
      <div className="mt-2">
        <AddPayoutManager
          key={managers.length}
          users={getPotentialUsers(usersQuery?.data?.users || [], managers)}
          managers={managers}
          isOpen={newManagerState}
          setOpen={setNewManagerState}
          onNewManagerSelected={onNewManagerSelected}
        />
        {managers.map((item: DepartmentPayoutManager, index: number) => {
          return (
            <div key={item._id}>
              <ManagerInstance
                editableManager={item}
                onDelete={() => onDeleteManager(item._id)}
              />
              {index === managers.length - 1 ? null : <Divider />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div>Расчет заработной платы</div>
        <div>
          <Button
            intent={'success'}
            minimal
            icon={'plus'}
            onClick={() => setNewManagerState(true)}
          />
        </div>
      </div>
      {managersQuery.loading ? null : renderManagersList()}
    </div>
  );
};
