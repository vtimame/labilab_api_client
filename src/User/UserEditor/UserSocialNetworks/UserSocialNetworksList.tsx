import React, { FunctionComponent, useState } from 'react';
import { Scalars, UserSocialNetwork } from '../../../types';
import { observer } from 'mobx-react-lite';
import { Button } from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { DELETE_USER_SOCIAL_NETWORK } from './graphql';
import { CreateSocialNetworkDialog } from './CreateSocialNetworkDialog';
import { UserSocialNetworkInstance } from './UserSocialNetworkInstance';

interface UserSocialNetworksListProps {
  socialNetworks: UserSocialNetwork[];
  userId: Scalars['ID'];
}

export const UserSocialNetworksList: FunctionComponent<UserSocialNetworksListProps> = observer(
  (props) => {
    const [newSocialNetwork, setNewSocialNetwork] = useState<boolean>(false);
    const [socialNetworksList, setSocialNetworksList] = useState<
      UserSocialNetwork[]
    >(props.socialNetworks);
    const [deleteSocialNetwork] = useMutation(DELETE_USER_SOCIAL_NETWORK);

    const onCancel = async (socialNetworkId: string) => {
      await deleteSocialNetwork({ variables: { id: socialNetworkId } });
      setSocialNetworksList(
        socialNetworksList.filter(
          (socialNetwork: UserSocialNetwork) =>
            socialNetwork._id !== socialNetworkId
        )
      );
    };

    return (
      <div className="pt-2">
        {socialNetworksList.map((item) => {
          return (
            <UserSocialNetworkInstance
              key={item._id}
              itemInstance={item}
              onCancel={() => onCancel(item._id)}
            />
          );
        })}
        <div className="d-flex justify-content-end">
          <CreateSocialNetworkDialog
            userId={props.userId}
            isOpen={newSocialNetwork}
            setOpen={setNewSocialNetwork}
            onSave={(newSocialNetworkInstance: UserSocialNetwork) =>
              setSocialNetworksList([
                ...socialNetworksList,
                newSocialNetworkInstance,
              ])
            }
          />
          <Button
            minimal
            intent={'success'}
            icon={'plus'}
            onClick={() => setNewSocialNetwork(true)}
          >
            Добавить социальную сеть
          </Button>
        </div>
      </div>
    );
  }
);
