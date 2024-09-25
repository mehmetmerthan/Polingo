/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      words {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWord = /* GraphQL */ `
  query GetWord($id: ID!) {
    getWord(id: $id) {
      id
      user {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      word
      translation
      isLearned
      createdAt
      updatedAt
      userWordsId
      __typename
    }
  }
`;
export const listWords = /* GraphQL */ `
  query ListWords(
    $filter: ModelWordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        word
        translation
        isLearned
        createdAt
        updatedAt
        userWordsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
