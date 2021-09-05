import { gql } from '@apollo/client';

export const USER_SOCIAL_NETWORK_BODY = `
    _id
    label
    link
`;

export const USER_SOCIAL_NETWORKS = gql`
    query userSocialNetworks($userId: String!) {
        userSocialNetworks(userId: $userId) {
            ${USER_SOCIAL_NETWORK_BODY}
        }
    }
`;

export const CREATE_USER_SOCIAL_NETWORK = gql`
    mutation createUserSocialNetwork($payload: CreateUserSocialNetworkDto!) {
        createUserSocialNetwork(payload: $payload) {
            ${USER_SOCIAL_NETWORK_BODY}
        }
    }
`;

export const UPDATE_USER_SOCIAL_NETWORK = gql`
    mutation updateUserSocialNetowrk($payload: UpdateUserSocialNetworkDto!) {
        updateUserSocialNetwork(payload: $payload) {
            ${USER_SOCIAL_NETWORK_BODY}
        }
    }
`;

export const DELETE_USER_SOCIAL_NETWORK = gql`
    mutation deleteUserSocialNetwork($id: String!) {
        deleteUserSocialNetwork(id: $id) {
            ${USER_SOCIAL_NETWORK_BODY}
        }
    }
`;
