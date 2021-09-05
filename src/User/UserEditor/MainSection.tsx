import React, { FunctionComponent } from 'react';
import { Division, Role, User } from '../../types';
import { AvatarEditor } from './AvatarEditor';
import {
  Button,
  Classes,
  EditableText,
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core';
import { gql, QueryResult } from '@apollo/client';
import { client } from '../../utils/apolloClient';

interface MainSectionProps {
  user: User;
  setUser: Function;
  rolesQuery: QueryResult;
  divisionsQuery: QueryResult;
  updateUserMutation: Function;
  fetchUser: Function;
}

const USER = gql`
  query user($payload: UserInput!) {
    user(payload: $payload) {
      _id
    }
  }
`;

export const MainSection: FunctionComponent<MainSectionProps> = ({
  user,
  setUser,
  rolesQuery,
  divisionsQuery,
  updateUserMutation,
  fetchUser,
}) => {
  const validateAndSave = async (property: string, value: string) => {
    if (property === 'alias') {
      const findUser = await client.query({
        query: USER,
        variables: { payload: { alias: value } },
      });

      if (findUser?.data?.user && findUser?.data?.user?._id !== user._id) {
        console.log('Alias validation filed');
        return false;
      }
    }

    if (value.length > 0) {
      await updateUserMutation({
        variables: { payload: { _id: user._id, [property]: value } },
      });
      await fetchUser();
    }
  };

  return (
    <div className="d-flex align-items-center">
      <AvatarEditor
        userId={user._id}
        name={user.name}
        surname={user.surname}
        avatar={user.avatar?.link}
        setUser={setUser}
        fetchUser={fetchUser}
      />
      <div style={{ marginLeft: '1rem' }}>
        <div className="d-flex align-items-center">
          <h2 style={{ margin: '0 0.5rem 0 0' }}>
            <EditableText
              value={user.surname}
              placeholder="Фамилия"
              minWidth={0}
              onChange={(value) => setUser({ ...user, ...{ surname: value } })}
              onConfirm={(value) => validateAndSave('surname', value)}
            />
          </h2>
          <h2 style={{ margin: '0 0.5rem 0 0' }}>
            <EditableText
              value={user.name}
              placeholder="Имя"
              minWidth={0}
              onChange={(value) => setUser({ ...user, ...{ name: value } })}
              onConfirm={(value) => validateAndSave('name', value)}
            />
          </h2>
          <h2 style={{ margin: '0 0.5rem 0 0' }}>
            <EditableText
              value={user.patronymic || ''}
              onConfirm={(value) => validateAndSave('patronymic', value)}
              onChange={(value) =>
                setUser({ ...user, ...{ patronymic: value } })
              }
              placeholder="Отчество"
              minWidth={0}
            />
          </h2>
        </div>
        <div className={`d-flex ${Classes.TEXT_MUTED}`}>
          <div>@</div>
          <EditableText
            value={user.alias || ''}
            onChange={(value) => setUser({ ...user, ...{ alias: value } })}
            onConfirm={(value) => validateAndSave('alias', value)}
            placeholder="Алиас"
            minWidth={0}
          />
        </div>
        <div
          className={`d-flex align-items-center ${Classes.TEXT_MUTED}`}
          style={{ marginLeft: '-10px' }}
        >
          <Popover
            minimal
            content={
              <Menu style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {divisionsQuery.data?.divisions.length > 0 ? (
                  divisionsQuery.data?.divisions?.map((division: Division) => {
                    return (
                      <MenuItem
                        key={division._id}
                        text={division.name}
                        onClick={() =>
                          validateAndSave('divisionId', division._id)
                        }
                      />
                    );
                  })
                ) : (
                  <MenuItem disabled text="Здесь пока нет ни одного отдела" />
                )}
              </Menu>
            }
            position={Position.BOTTOM_LEFT}
          >
            <Button
              minimal={true}
              rightIcon="caret-down"
              intent={!user.division?.name ? 'danger' : 'none'}
            >
              {user.division?.name || 'За штатом'}
            </Button>
          </Popover>
          <Popover
            minimal
            content={
              <Menu style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {rolesQuery.data?.roles.length > 0 ? (
                  rolesQuery.data?.roles?.map((role: Role) => {
                    return (
                      <MenuItem
                        key={role._id}
                        text={role.name}
                        onClick={() => validateAndSave('roleId', role._id)}
                      />
                    );
                  })
                ) : (
                  <MenuItem disabled text="Здесь пока нет ни одной должности" />
                )}
              </Menu>
            }
            position={Position.BOTTOM_LEFT}
          >
            <Button
              minimal={true}
              rightIcon="caret-down"
              intent={!user.role?.name ? 'danger' : 'none'}
            >
              {user.role?.name || 'Без должности'}
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  );
};
