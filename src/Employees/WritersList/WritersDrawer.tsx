import React, { FunctionComponent } from 'react';
import { Callout, Classes, Divider, Drawer, Icon } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Store';
import { gql, useMutation, useQuery } from '@apollo/client';
import Avatar from 'react-avatar';
import { UPDATE_WRITERS_LIST } from '../graphql';

interface IRole {
  name: string;
}

interface IUser {
  _id: string;
  name: string;
  surname: string;
  alias: string;
  avatar?: string | null;
  role?: IRole;
}

const USERS = gql`
  query {
    users {
      _id
      name
      surname
      avatar {
        link
      }
      alias
      role {
        name
      }
    }
  }
`;

interface Props {
  writers: IUser[];
  permissionId: string;
  isOpened: boolean;
  setDrawerOpenedState: Function;
}

export const WritersDrawer: FunctionComponent<Props> = observer(
  ({ writers, permissionId, isOpened, setDrawerOpenedState }) => {
    const { app } = useStore();
    const usersQuery = useQuery(USERS);
    const [updateWritersList] = useMutation(UPDATE_WRITERS_LIST);

    if (usersQuery.data) {
      const users: IUser[] = usersQuery.data['users'];

      const onClick = async (id: string) => {
        let newWritersList = [...writers.map((el) => el._id)];
        if (isWriter(id))
          newWritersList = newWritersList.filter((el) => el !== id);
        else newWritersList.push(id);

        await updateWritersList({
          variables: { _id: permissionId, writersIds: newWritersList },
        }).catch((error) => {
          console.log(error);
        });
      };

      const isWriter = (id: string): boolean => {
        return writers.find((el) => el._id === id) !== undefined;
      };

      return (
        <Drawer
          style={{ width: '450px' }}
          isOpen={isOpened}
          onClose={() => setDrawerOpenedState(false)}
          className={app.isDark ? Classes.DARK : ''}
        >
          <div className={Classes.DRAWER_HEADER}>
            Изменить список редакторов
          </div>
          <div className={Classes.DIALOG_BODY} style={{ overflowY: 'auto' }}>
            {users.map((user, userIndex) => {
              return (
                <div key={user._id}>
                  <Callout
                    style={{ cursor: 'pointer' }}
                    onClick={() => onClick(user._id)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <Avatar
                          name={`${user.name} ${user.surname}`}
                          size="38"
                          src={user.avatar || undefined}
                          round
                        />
                        <div className="ml-2">
                          <div style={{ fontWeight: 600, lineHeight: '13px' }}>
                            {user.name} {user.surname}
                          </div>
                          <div
                            style={{ fontSize: '13px' }}
                            className={Classes.TEXT_MUTED}
                          >
                            @{user.alias} - {user.role?.name || 'Без роли'}
                          </div>
                        </div>
                      </div>
                      {isWriter(user._id) ? (
                        <Icon icon={'tick'} intent={'success'} />
                      ) : null}
                    </div>
                  </Callout>
                  {userIndex === users.length - 1 ? null : <Divider />}
                </div>
              );
            })}
          </div>
        </Drawer>
      );
    }

    return null;
  }
);
