import { gql } from '@apollo/client';

export const USER_MESSENGER_BODY = `
    _id
    label
    nickname
`;

export const USER_MESSENGERS = gql`
    query userMessengers($userId: String!) {
        userMessengers(userId: $userId) {
            ${USER_MESSENGER_BODY}
        }
    }
`;

export const CREATE_USER_MESSENGER = gql`
    mutation createUserMessenger($payload: CreateUserMessengerDto!) {
        createUserMessenger(payload: $payload) {
            ${USER_MESSENGER_BODY}
        }
    }
`;

export const UPDATE_USER_MESSENGER = gql`
    mutation updateUserMessenger($payload: UpdateUserMessengerDto!) {
        updateUserMessenger(payload: $payload) {
            ${USER_MESSENGER_BODY}
        }
    }
`;

export const DELETE_USER_MESSENGER = gql`
    mutation deleteUserMessenger($id: String!) {
        deleteUserMessenger(_id: $id) {
            ${USER_MESSENGER_BODY}
        }
    }
`;
