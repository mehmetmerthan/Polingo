/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      email
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      email
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      email
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
export const onCreateWord = /* GraphQL */ `
  subscription OnCreateWord($filter: ModelSubscriptionWordFilterInput) {
    onCreateWord(filter: $filter) {
      id
      word
      translation
      isLearned
      type
      createdAt
      updatedAt
      userWordsId
      __typename
    }
  }
`;
export const onUpdateWord = /* GraphQL */ `
  subscription OnUpdateWord($filter: ModelSubscriptionWordFilterInput) {
    onUpdateWord(filter: $filter) {
      id
      word
      translation
      isLearned
      type
      createdAt
      updatedAt
      userWordsId
      __typename
    }
  }
`;
export const onDeleteWord = /* GraphQL */ `
  subscription OnDeleteWord($filter: ModelSubscriptionWordFilterInput) {
    onDeleteWord(filter: $filter) {
      id
      word
      translation
      isLearned
      type
      createdAt
      updatedAt
      userWordsId
      __typename
    }
  }
`;
export const onCreateAIScenario = /* GraphQL */ `
  subscription OnCreateAIScenario(
    $filter: ModelSubscriptionAIScenarioFilterInput
  ) {
    onCreateAIScenario(filter: $filter) {
      id
      title
      description
      firstMessage
      role
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAIScenario = /* GraphQL */ `
  subscription OnUpdateAIScenario(
    $filter: ModelSubscriptionAIScenarioFilterInput
  ) {
    onUpdateAIScenario(filter: $filter) {
      id
      title
      description
      firstMessage
      role
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAIScenario = /* GraphQL */ `
  subscription OnDeleteAIScenario(
    $filter: ModelSubscriptionAIScenarioFilterInput
  ) {
    onDeleteAIScenario(filter: $filter) {
      id
      title
      description
      firstMessage
      role
      createdAt
      updatedAt
      __typename
    }
  }
`;
