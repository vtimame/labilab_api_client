import React, { FunctionComponent } from 'react';
import { Scalars } from '../../../types';
import { useQuery } from '@apollo/client';
import { USER_MESSENGERS } from './graphql';
import { UserMessengersList } from './UserMessengersList';

interface UserMessengersProps {
  userId: Scalars['ID'];
}

export const UserMessengers: FunctionComponent<UserMessengersProps> = ({
  userId,
}) => {
  const userMessengersQuery = useQuery(USER_MESSENGERS, {
    variables: { userId },
  });

  if (userMessengersQuery?.data) {
    return (
      <UserMessengersList
        messengers={userMessengersQuery?.data?.userMessengers}
        userId={userId}
      />
    );
  }

  return null;
};
