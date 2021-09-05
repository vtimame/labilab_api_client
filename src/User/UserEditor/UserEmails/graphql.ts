import { gql } from '@apollo/client';

export const USER_EMAIL_BODY = `
    _id
    label
    email
    isLogin
`;

export const USER_EMAILS = gql`
    query userEmails($userId: String!) {
        userEmails(userId: $userId) {
            ${USER_EMAIL_BODY}
        }
    }
`;

export const CREATE_USER_EMAIL = gql`
    mutation createUserEmail($payload: CreateUserEmailDto!) {
        createUserEmail(payload: $payload) {
            ${USER_EMAIL_BODY}
        }
    }
`;

export const UPDATE_USER_EMAIL = gql`
    mutation updateUserEmail($payload: UpdateUserEmailDto!) {
        updateUserEmail(payload: $payload) {
            ${USER_EMAIL_BODY}
        }
    }
`;

export const DELETE_USER_EMAIL = gql`
    mutation deleteUserEmail($id: String!) {
        deleteUserEmail(_id: $id) {
            ${USER_EMAIL_BODY}
        }
    }
`;

export const USER_EMAIL_LABELS = gql`
  query phoneLabels($type: String!) {
    userLabels(type: $type) {
      _id
      type
      name
    }
  }
`;
