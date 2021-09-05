import React, { FunctionComponent, useState } from 'react';
import { Menu, MenuItem, Tag } from '@blueprintjs/core';
import Avatar from 'react-avatar';
import { ContextMenu } from '../components/ContextMenu';
import { WritersDrawer } from './WritersList/WritersDrawer';

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

interface WritersListProps {
  permissions: any;
}

export const WritersList: FunctionComponent<WritersListProps> = ({
  permissions,
}) => {
  const writers: IUser[] = permissions.writers;
  const [drawerIsOpened, setDrawerOpenedState] = useState(false);

  return (
    <>
      <WritersDrawer
        writers={writers}
        permissionId={permissions._id}
        isOpened={drawerIsOpened}
        setDrawerOpenedState={setDrawerOpenedState}
      />
      <ContextMenu
        menu={
          <Menu>
            <MenuItem
              icon="edit"
              text="Изменить список"
              onClick={() => setDrawerOpenedState(true)}
            />
          </Menu>
        }
      >
        {writers.length > 0 ? (
          <div className="d-flex align-items-center">
            <div
              className="d-flex"
              style={{ cursor: 'pointer' }}
              id="administrators-list"
            >
              {writers.map((user) => {
                return (
                  <Avatar
                    key={user._id}
                    name={`${user.name} ${user.surname}`}
                    size="32"
                    src={user.avatar || undefined}
                    round
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <Tag intent={'danger'} minimal style={{ cursor: 'pointer' }}>
            Здесь пока нет редакторов
          </Tag>
        )}
      </ContextMenu>
    </>
  );
};
