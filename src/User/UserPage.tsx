import React, { FunctionComponent } from 'react';
import { DefaultLayout } from '../components/DefaultLayout';
import { Redirect, useParams } from '@reach/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import { PERMISSIONS, USER_BODY } from '../Employees/graphql';
import { Routes } from '../utils/Routes';
import { LoadingComponent } from '../components/LoadingComponent';
import { UserEditor } from './UserEditor';

const USER = gql`
  query user($payload: UserInput!) {
    user(payload: $payload) {
      ${USER_BODY}
      employmentAt
      dismissalAt
      bik
      kpp
      correspondentAccount
      checkingAccount
      hobbies
      professionalHobbies
      snils
      inn
      passport {
        serial
        number
        dateOfIssue
        departmentCode
        issuedBy
      }
      division {
        name
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($payload: UpdateUserDto!) {
    updateUser(payload: $payload) {
      ${USER_BODY}
      division {
        name
      }
    }
  }
`;

export const UserPage: FunctionComponent = () => {
  const { id } = useParams();
  const userQuery = useQuery(USER, { variables: { payload: { _id: id } } });
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const permissionQuery = useQuery(PERMISSIONS, {
    variables: { pathname: Routes.EMPLOYEES },
  });

  if (!permissionQuery.loading) {
    const userIsWriter = permissionQuery.data?.permission?.iAmIsWriter;

    return userIsWriter ? (
      <DefaultLayout>
        {userQuery.data ? (
          <UserEditor
            editableUser={userQuery.data.user}
            updateUserMutation={updateUserMutation}
            fetch={userQuery.refetch}
          />
        ) : (
          <div
            style={{ height: '500px', fontSize: '1.2rem', fontWeight: 600 }}
            className="d-flex justify-content-center align-items-center"
          >
            Пользователь не найден
          </div>
        )}
      </DefaultLayout>
    ) : (
      <Redirect to="/me" />
    );
  }

  return (
    <DefaultLayout>
      <LoadingComponent />
    </DefaultLayout>
  );
};
