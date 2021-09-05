import { gql } from '@apollo/client';

export const CREATE_LABEL = gql`
  mutation createLabel($payload: CreateUserLabelDto!) {
    createUserLabel(payload: $payload) {
      _id
      type
      name
    }
  }
`;
