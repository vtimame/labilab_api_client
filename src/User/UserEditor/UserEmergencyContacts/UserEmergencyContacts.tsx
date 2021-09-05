import React, { FunctionComponent } from 'react';
import { Scalars } from '../../../types';
import { useQuery } from '@apollo/client';
import { USER_EMERGENCY_CONTACTS } from './graphql';
import { UserEmergencyContactsList } from './UserEmergencyContactsList';

interface UserMessengersProps {
  userId: Scalars['ID'];
}

export const UserEmergencyContacts: FunctionComponent<UserMessengersProps> = ({
  userId,
}) => {
  const userEmergencyContactsQuery = useQuery(USER_EMERGENCY_CONTACTS, {
    variables: { userId },
  });

  if (userEmergencyContactsQuery?.data) {
    return (
      <UserEmergencyContactsList
        emergencyContacts={
          userEmergencyContactsQuery?.data?.userEmergencyContacts
        }
        userId={userId}
      />
    );
  }

  return null;
};
