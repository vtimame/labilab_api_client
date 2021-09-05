import { gql } from '@apollo/client';

export const USER_EMERGENCY_CONTACT_BODY = `
    _id
    name
    surname
    patronymic
    relation
    phone
`;

export const USER_EMERGENCY_CONTACTS = gql`
    query userEmergencyContacts($userId: String!) {
        userEmergencyContacts(userId: $userId) {
            ${USER_EMERGENCY_CONTACT_BODY}
        }
    }
`;

export const CREATE_USER_EMERGENCY_CONTACT = gql`
    mutation createUserEmergencyContact($payload: CreateUserEmergencyContactDto!) {
        createUserEmergencyContact(payload: $payload) {
            ${USER_EMERGENCY_CONTACT_BODY}
        }
    }
`;

export const UPDATE_USER_EMERGENCY_CONTACT = gql`
    mutation updateUserEmergencyContact($payload: UpdateUserEmergencyContactDto!) {
        updateUserEmergencyContact(payload: $payload) {
            ${USER_EMERGENCY_CONTACT_BODY}
        }
    }
`;

export const DELETE_USER_EMERGENCY_CONTACT = gql`
    mutation deleteUserEmergencyContact($id: String!) {
        deleteUserEmergencyContact(id: $id) {
            ${USER_EMERGENCY_CONTACT_BODY}
        }
    }
`;
