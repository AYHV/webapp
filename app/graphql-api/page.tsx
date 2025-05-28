import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      users {
        id
        name
        role
        email
        createdAt
      }
      totalCount
      pageInfo {
        currentPage
        totalPages
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
export const CREATE_USER = gql`
  mutation CreateUser($input: RegisterInput!) {
    createUser(input: $input) {
      id
      name
      role
      email
      createdAt
    }
  }
`;
export const GET_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;
export const  UPDATE_USER = gql`
 mutation UpdateUser($updateUserId: ID!, $input: UpdateUserInput!) {
  updateUser(id: $updateUserId, input: $input) {
    id
    name
    email
    role
    createdAt
    updatedAt
  }
}
  `;