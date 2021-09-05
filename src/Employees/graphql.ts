import { gql } from '@apollo/client';

export const USER_BODY = `
  _id
  surname
  name
  patronymic
  alias
  roleId
  sex
  avatar {
    link
  }
  birthday
  role {
  name
  }
`;

export const DEPARTMENTS = gql`
  query {
    departments {
      _id
      name
      divisions {
        _id
        name
        chefId
        users {
          ${USER_BODY}
        }
      }
    }
  }
`;

export const DIVISIONS = gql`
  query {
    divisions {
      _id
      name
    }
  }
`;

const PERMISSIONS_BODY = `
    _id
    pathname
    allIsReaders
    allIsWriters
    iAmIsReader
    iAmIsWriter
    readers {
      _id
      avatar { link }
      name
      surname
    }
    writers {
      _id
      avatar { link }
      name
      surname
    }
`;

export const PERMISSIONS = gql`
  query permissionsQuery($pathname: String!) {
    permission(pathname: $pathname) {
      ${PERMISSIONS_BODY}
    }
  }
`;

export const UPDATE_WRITERS_LIST = gql`
  mutation updateWritersList($_id: String!, $writersIds: [String]!) {
    updatePermission(payload: { _id: $_id, writersIds: $writersIds }) {
      ${PERMISSIONS_BODY}
    }
  }
`;

const DEPARTMENT_BODY = `
    _id
    name
    divisions {
      _id
      users {
        _id
      }
    }
`;

export const CREATE_DEPARTMENT = gql`
  mutation createDepartment($name: String!) {
    createDepartment(payload: { name: $name }) {
      ${DEPARTMENT_BODY}
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation updateDepartment($_id: ID!, $name: String!) {
    updateDepartment(payload: { _id: $_id, name: $name }) {
      ${DEPARTMENT_BODY}
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation deleteDepartment($_id: String!) {
    deleteDepartment(_id: $_id) {
      ${DEPARTMENT_BODY}
    }
  }
`;

export const CREATE_DIVISION = gql`
  mutation createDivision($name: String!, $departmentId: String!) {
    createDivision(payload: { name: $name, departmentId: $departmentId }) {
      _id
      name
    }
  }
`;

export const UPDATE_DIVISION = gql`
  mutation updateDivision($payload: UpdateDivisionDto!) {
    updateDivision(payload: $payload) {
      _id
      name
    }
  }
`;

export const DELETE_DIVISION = gql`
  mutation deleteDivision($_id: String!) {
    deleteDivision(_id: $_id) {
      _id
      name
    }
  }
`;

const ROLE_BODY = `
    _id
    name
    users {
      _id
    }
`;

export const ROLES = gql`
  query {
    roles {
      ${ROLE_BODY}
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation createRole($name: String!) {
    createRole(payload: { name: $name }) {
      ${ROLE_BODY}
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($_id: ID!, $name: String!) {
    updateRole(payload: { _id: $_id, name: $name }) {
      ${ROLE_BODY}
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation deleteRole($_id: String!) {
    deleteRole(_id: $_id) {
      ${ROLE_BODY}
    }
  }
`;

export const USERS = gql`
  query {
    users {
      ${USER_BODY}
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($payload: CreateUserDto!) {
    createUser(payload: $payload) {
      ${USER_BODY}
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($payload: UpdateUserDto!) {
    updateUser(payload: $payload) {
      ${USER_BODY}
    }
  }
`;
