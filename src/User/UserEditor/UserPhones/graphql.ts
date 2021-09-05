import { gql } from '@apollo/client';

export const USER_PHONE_BODY = `
    _id
    label
    phone
    isLogin
`;

export const USER_PHONES = gql`
    query userPhones($userId: String!) {
        userPhones(userId: $userId) {
            ${USER_PHONE_BODY}
        }
    }
`;

export const CREATE_USER_PHONE = gql`
    mutation createUserPhone($payload: CreateUserPhoneDto!) {
        createUserPhone(payload: $payload) {
            ${USER_PHONE_BODY}
        }
    }
`;

export const UPDATE_USER_PHONE = gql`
    mutation updateUserPhone($payload: UpdateUserPhoneDto!) {
        updateUserPhone(payload: $payload) {
            ${USER_PHONE_BODY}
        }
    }
`;

export const DELETE_USER_PHONE = gql`
    mutation deleteUserPhone($id: String!) {
        deleteUserPhone(_id: $id) {
            ${USER_PHONE_BODY}
        }
    }
`;

export const USER_PHONE_LABELS = gql`
  query phoneLabels($type: String!) {
    userLabels(type: $type) {
      _id
      type
      name
    }
  }
`;
