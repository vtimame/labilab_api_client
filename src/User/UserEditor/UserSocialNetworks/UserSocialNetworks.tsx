import React, { FunctionComponent } from 'react';
import { Scalars } from '../../../types';
import { useQuery } from '@apollo/client';
import { USER_SOCIAL_NETWORKS } from './graphql';
import { UserSocialNetworksList } from './UserSocialNetworksList';

interface UserSocialNetworksProps {
  userId: Scalars['ID'];
}

export const UserSocialNetworks: FunctionComponent<UserSocialNetworksProps> = ({
  userId,
}) => {
  const socialNetworksQuery = useQuery(USER_SOCIAL_NETWORKS, {
    variables: { userId },
  });

  if (socialNetworksQuery?.data) {
    return (
      <UserSocialNetworksList
        socialNetworks={socialNetworksQuery?.data?.userSocialNetworks}
        userId={userId}
      />
    );
  }

  return null;
};
