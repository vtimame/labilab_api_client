import React, { FunctionComponent } from 'react';
import { Scalars } from '../../../types';
import { useQuery } from '@apollo/client';
import { USER_EMAILS } from './graphql';
import { UserEmailsList } from './UserEmailsList';

interface UserEmailsProps {
  userId: Scalars['ID'];
}

export const UserEmails: FunctionComponent<UserEmailsProps> = ({ userId }) => {
  const emailsQuery = useQuery(USER_EMAILS, { variables: { userId } });

  if (emailsQuery?.data) {
    return (
      <UserEmailsList emails={emailsQuery.data?.userEmails} userId={userId} />
    );
  }

  return null;
};
