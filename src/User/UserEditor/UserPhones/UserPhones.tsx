import React, { FunctionComponent } from 'react';
import { Scalars } from '../../../types';
import { useQuery } from '@apollo/client';
import { USER_PHONES } from './graphql';
import { UserPhonesList } from './UserPhonesList';

interface UserPhonesProps {
  userId: Scalars['ID'];
}

export const UserPhones: FunctionComponent<UserPhonesProps> = ({ userId }) => {
  const phonesQuery = useQuery(USER_PHONES, { variables: { userId } });

  if (phonesQuery?.data) {
    return (
      <UserPhonesList phones={phonesQuery?.data?.userPhones} userId={userId} />
    );
  }

  return null;
};
