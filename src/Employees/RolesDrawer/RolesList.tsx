import React, { FunctionComponent } from 'react';
import { QueryResult } from '@apollo/client';
import { RoleInstance } from './RoleInstance';
import { Role } from '../../types';

interface RolesListProps {
  rolesQuery: QueryResult;
}

export const RolesList: FunctionComponent<RolesListProps> = ({
  rolesQuery,
}) => {
  const roles: Role[] = rolesQuery?.data?.roles;

  return (
    <div>
      {roles.map((role: Role, roleIndex: number) => {
        return (
          <RoleInstance
            key={role._id}
            role={role}
            rolesLength={roles.length}
            index={roleIndex}
            reFetchRoles={rolesQuery.refetch}
          />
        );
      })}
    </div>
  );
};
