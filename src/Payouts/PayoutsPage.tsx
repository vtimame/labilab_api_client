import React, { FunctionComponent } from 'react';
import { DefaultLayout } from '../components/DefaultLayout';
import { gql, useQuery } from '@apollo/client';
import { PayoutsPageBody } from './PayoutsPageBody';
import { User } from '../types';

interface PayoutsPageProps {
  //
}

const USERS = gql`
  query {
    users {
      name
      surname
      _id
      division {
        departmentId
      }
      role {
        name
      }
    }
  }
`;

const USER = gql`
  query {
    whoAmI {
      _id
      isAdmin
    }
  }
`;

export const PayoutsPage: FunctionComponent<PayoutsPageProps> = (props) => {
  const userQuery = useQuery(USER);
  const usersQuery = useQuery(USERS);

  if (!userQuery.loading && !usersQuery.loading) {
    const user: User = userQuery.data.whoAmI;
    const users: User[] = usersQuery.data.users;
    return (
      <DefaultLayout fluid>
        <PayoutsPageBody user={user} users={users} />
      </DefaultLayout>
    );
  }

  return null;
};
