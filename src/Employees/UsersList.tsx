import React, { FunctionComponent } from 'react';
import { Callout, Classes, Divider, Icon } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import Avatar from 'react-avatar';
import { Maybe, User } from '../types';
import { Draggable } from 'react-beautiful-dnd';
import { useCompactViewState, usePermissionsQuery } from './EmployeesPage';
import { useNavigate } from '@reach/router';
import { UserAvatar } from '../components/UserAvatar';

interface UsersListProps {
  users: Maybe<User>[] | null | undefined;
  chefId?: string | null;
}

export const UsersList: FunctionComponent<UsersListProps> = observer(
  ({ users, chefId }) => {
    const permissionsQuery = usePermissionsQuery();
    const userIsWriter = permissionsQuery?.data?.permission?.iAmIsWriter;
    const navigate = useNavigate();
    const compactView = useCompactViewState();

    const renderCompactView = () => {
      return (
        <div className="d-flex flex-wrap">
          {users?.map((user: Maybe<User>, userIndex: number) => {
            return (
              <div
                key={user?._id}
                style={{ position: 'relative', margin: '0 0.5rem 1rem 0' }}
              >
                <UserAvatar userId={user?._id} />
                {user?._id === chefId ? (
                  <div
                    style={{
                      position: 'absolute',
                      right: -2,
                      bottom: -1,
                    }}
                  >
                    <Icon icon={'star'} intent={'warning'} iconSize={14} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      );
    };

    const renderFullView = () => {
      return users?.map((user: Maybe<User>, userIndex: number) => {
        return (
          <Draggable
            key={user?._id}
            isDragDisabled={!userIsWriter}
            draggableId={`${user?._id}`}
            index={userIndex}
          >
            {(provided, snapshot) => (
              <div
                key={user?._id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Callout
                  onClick={() => navigate(`/user/${user?._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div style={{ position: 'relative' }}>
                        <Avatar
                          name={`${user?.name} ${user?.surname}`}
                          src={user?.avatar?.link || undefined}
                          size="38"
                          round
                        />
                        {user?._id === chefId ? (
                          <div
                            style={{
                              position: 'absolute',
                              right: -2,
                              bottom: -1,
                            }}
                          >
                            <Icon
                              icon={'star'}
                              intent={'warning'}
                              iconSize={14}
                            />
                          </div>
                        ) : null}
                      </div>
                      <div style={{ marginLeft: '0.5rem' }}>
                        <div
                          style={{
                            fontSize: '1rem',
                            lineHeight: '1rem',
                            fontWeight: 600,
                          }}
                        >
                          {user?.name} {user?.surname}
                        </div>
                        <div
                          className={Classes.TEXT_MUTED}
                          style={{ fontSize: '13px' }}
                        >
                          {user?.role?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </Callout>
                {userIndex === users.length - 1 ? null : <Divider />}
              </div>
            )}
          </Draggable>
        );
      });
    };

    return (
      <div className={`mt-2 ${compactView ? '' : 'pb-2'}`}>
        {compactView ? renderCompactView() : renderFullView()}
      </div>
    );
  }
);
