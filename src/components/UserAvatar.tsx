import React, { FunctionComponent } from 'react';
import { User } from '../types';
import {
  Classes,
  Popover,
  PopoverInteractionKind,
  Position,
  Spinner,
} from '@blueprintjs/core';
import Avatar from 'react-avatar';
import { gql, useQuery } from '@apollo/client';

interface UserAvatarProps {
  userId?: string;
  size?: string;
}

export const UserAvatar: FunctionComponent<UserAvatarProps> = (props) => {
  const userQuery = useQuery(
    gql`
      query user($payload: UserInput!) {
        user(payload: $payload) {
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
    `,
    { variables: { payload: { _id: props.userId } } }
  );

  const renderPopoverContent = (user: User) => {
    return (
      <div className="py-2 px-3 d-flex align-items-center">
        <div className="mr-2">{renderAvatarObject(user, 1.2)}</div>
        <div>
          <div style={{ fontWeight: 600 }}>
            {user?.surname} {user?.name}
          </div>
          <div className={Classes.TEXT_MUTED}>
            {user?.role?.name || 'Без роли'}
          </div>
        </div>
      </div>
    );
  };

  const renderAvatarObject = (user: User, textSizeRatio: number = 3) => {
    return (
      <Avatar
        style={{ cursor: 'pointer' }}
        name={`${user?.surname} ${user?.name}`}
        src={user?.avatar?.link || undefined}
        size={props.size || '38'}
        textSizeRatio={textSizeRatio}
        round
      />
    );
  };

  const renderAvatar = () => {
    if (!props.userId) return <div />;
    else {
      const user: User = userQuery?.data?.user;
      return (
        <Popover
          position={Position.TOP_LEFT}
          hoverOpenDelay={300}
          interactionKind={PopoverInteractionKind.HOVER}
          content={renderPopoverContent(user)}
        >
          {renderAvatarObject(user)}
        </Popover>
      );
    }
  };

  return userQuery.loading ? <Spinner size={20} /> : renderAvatar();
};
