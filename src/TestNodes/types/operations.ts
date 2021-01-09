import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type TestDetailsFragment = { __typename?: 'Test' } & Pick<
  Types.Test,
  'id' | 'test'
>;

export type QueryTestQueryVariables = Types.Exact<{ [key: string]: never }>;

export type QueryTestQuery = { __typename?: 'Query' } & {
  queryTest?: Types.Maybe<
    Array<Types.Maybe<{ __typename?: 'Test' } & TestDetailsFragment>>
  >;
};

export type AddTestMutationVariables = Types.Exact<{
  test: Types.AddTestInput;
}>;

export type AddTestMutation = { __typename?: 'Mutation' } & {
  addTest?: Types.Maybe<
    { __typename?: 'AddTestPayload' } & {
      test?: Types.Maybe<
        Array<Types.Maybe<{ __typename?: 'Test' } & TestDetailsFragment>>
      >;
    }
  >;
};

export type UpdateTestMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  patch: Types.TestPatch;
}>;

export type UpdateTestMutation = { __typename?: 'Mutation' } & {
  updateTest?: Types.Maybe<
    { __typename?: 'UpdateTestPayload' } & {
      test?: Types.Maybe<
        Array<Types.Maybe<{ __typename?: 'Test' } & TestDetailsFragment>>
      >;
    }
  >;
};

export type DeleteTestMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeleteTestMutation = { __typename?: 'Mutation' } & {
  deleteTest?: Types.Maybe<
    { __typename?: 'DeleteTestPayload' } & {
      test?: Types.Maybe<
        Array<Types.Maybe<{ __typename?: 'Test' } & Pick<Types.Test, 'id'>>>
      >;
    }
  >;
};

export const TestDetailsFragmentDoc = gql`
  fragment testDetails on Test {
    id
    test
  }
`;
export const QueryTestDocument = gql`
  query queryTest {
    queryTest {
      ...testDetails
    }
  }
  ${TestDetailsFragmentDoc}
`;

/**
 * __useQueryTestQuery__
 *
 * To run a query within a React component, call `useQueryTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryTestQuery(
  baseOptions?: Apollo.QueryHookOptions<
    QueryTestQuery,
    QueryTestQueryVariables
  >,
) {
  return Apollo.useQuery<QueryTestQuery, QueryTestQueryVariables>(
    QueryTestDocument,
    baseOptions,
  );
}
export function useQueryTestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QueryTestQuery,
    QueryTestQueryVariables
  >,
) {
  return Apollo.useLazyQuery<QueryTestQuery, QueryTestQueryVariables>(
    QueryTestDocument,
    baseOptions,
  );
}
export type QueryTestQueryHookResult = ReturnType<typeof useQueryTestQuery>;
export type QueryTestLazyQueryHookResult = ReturnType<
  typeof useQueryTestLazyQuery
>;
export type QueryTestQueryResult = Apollo.QueryResult<
  QueryTestQuery,
  QueryTestQueryVariables
>;
export const AddTestDocument = gql`
  mutation addTest($test: AddTestInput!) {
    addTest(input: [$test]) {
      test {
        ...testDetails
      }
    }
  }
  ${TestDetailsFragmentDoc}
`;
export type AddTestMutationFn = Apollo.MutationFunction<
  AddTestMutation,
  AddTestMutationVariables
>;

/**
 * __useAddTestMutation__
 *
 * To run a mutation, you first call `useAddTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTestMutation, { data, loading, error }] = useAddTestMutation({
 *   variables: {
 *      test: // value for 'test'
 *   },
 * });
 */
export function useAddTestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTestMutation,
    AddTestMutationVariables
  >,
) {
  return Apollo.useMutation<AddTestMutation, AddTestMutationVariables>(
    AddTestDocument,
    baseOptions,
  );
}
export type AddTestMutationHookResult = ReturnType<typeof useAddTestMutation>;
export type AddTestMutationResult = Apollo.MutationResult<AddTestMutation>;
export type AddTestMutationOptions = Apollo.BaseMutationOptions<
  AddTestMutation,
  AddTestMutationVariables
>;
export const UpdateTestDocument = gql`
  mutation updateTest($id: ID!, $patch: TestPatch!) {
    updateTest(input: { filter: { id: [$id] }, set: $patch }) {
      test {
        ...testDetails
      }
    }
  }
  ${TestDetailsFragmentDoc}
`;
export type UpdateTestMutationFn = Apollo.MutationFunction<
  UpdateTestMutation,
  UpdateTestMutationVariables
>;

/**
 * __useUpdateTestMutation__
 *
 * To run a mutation, you first call `useUpdateTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTestMutation, { data, loading, error }] = useUpdateTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      patch: // value for 'patch'
 *   },
 * });
 */
export function useUpdateTestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTestMutation,
    UpdateTestMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateTestMutation, UpdateTestMutationVariables>(
    UpdateTestDocument,
    baseOptions,
  );
}
export type UpdateTestMutationHookResult = ReturnType<
  typeof useUpdateTestMutation
>;
export type UpdateTestMutationResult = Apollo.MutationResult<UpdateTestMutation>;
export type UpdateTestMutationOptions = Apollo.BaseMutationOptions<
  UpdateTestMutation,
  UpdateTestMutationVariables
>;
export const DeleteTestDocument = gql`
  mutation deleteTest($id: ID!) {
    deleteTest(filter: { id: [$id] }) {
      test {
        id
      }
    }
  }
`;
export type DeleteTestMutationFn = Apollo.MutationFunction<
  DeleteTestMutation,
  DeleteTestMutationVariables
>;

/**
 * __useDeleteTestMutation__
 *
 * To run a mutation, you first call `useDeleteTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTestMutation, { data, loading, error }] = useDeleteTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTestMutation,
    DeleteTestMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteTestMutation, DeleteTestMutationVariables>(
    DeleteTestDocument,
    baseOptions,
  );
}
export type DeleteTestMutationHookResult = ReturnType<
  typeof useDeleteTestMutation
>;
export type DeleteTestMutationResult = Apollo.MutationResult<DeleteTestMutation>;
export type DeleteTestMutationOptions = Apollo.BaseMutationOptions<
  DeleteTestMutation,
  DeleteTestMutationVariables
>;
