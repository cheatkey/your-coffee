import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CoffeeItem = {
  __typename?: 'CoffeeItem';
  desc?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  locCountry?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  origin1?: Maybe<Scalars['String']['output']>;
  origin2?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  roast?: Maybe<Scalars['String']['output']>;
  roaster?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type CoffeeItemConnection = {
  __typename?: 'CoffeeItemConnection';
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  items?: Maybe<Array<Maybe<CoffeeItem>>>;
};

export type CoffeeItemDetail = {
  __typename?: 'CoffeeItemDetail';
  comments?: Maybe<Array<Maybe<CommentDetail>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  desc?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  locCountry?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  origin1?: Maybe<Scalars['String']['output']>;
  origin2?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  roast?: Maybe<Scalars['String']['output']>;
  roaster?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  userLiked?: Maybe<Scalars['Boolean']['output']>;
};

export type CoffeeStats = {
  __typename?: 'CoffeeStats';
  countries: Array<CountryStat>;
  tags: Array<TagStat>;
};

export type Comment = {
  __typename?: 'Comment';
  coffeeItemId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type CommentDetail = {
  __typename?: 'CommentDetail';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type CountryStat = {
  __typename?: 'CountryStat';
  count: Scalars['Int']['output'];
  country: Scalars['String']['output'];
};

export type LikeResponse = {
  __typename?: 'LikeResponse';
  coffeeItemId: Scalars['Int']['output'];
  liked: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  setLikeCoffeeItem: LikeResponse;
};


export type MutationAddCommentArgs = {
  coffeeItemId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
};


export type MutationSetLikeCoffeeItemArgs = {
  id: Scalars['Int']['input'];
  liked: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  coffeeItems?: Maybe<CoffeeItemConnection>;
  getCoffeeItemById?: Maybe<CoffeeItemDetail>;
  getLikedCoffeeStats: CoffeeStats;
  getTags: Array<Tag>;
};


export type QueryCoffeeItemsArgs = {
  filterCountry?: InputMaybe<Scalars['String']['input']>;
  filterTags?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCoffeeItemByIdArgs = {
  id: Scalars['Int']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type TagStat = {
  __typename?: 'TagStat';
  count: Scalars['Int']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  tag: Scalars['String']['output'];
};

export type SetLikeCoffeeItemMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  liked: Scalars['Boolean']['input'];
}>;


export type SetLikeCoffeeItemMutation = { __typename?: 'Mutation', setLikeCoffeeItem: { __typename?: 'LikeResponse', coffeeItemId: number, liked: boolean } };

export type AddCommentMutationVariables = Exact<{
  coffeeItemId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: { __typename?: 'Comment', id: number, userId: string, coffeeItemId: number, content: string, createdAt: string } };

export type GetCoffeeItemByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCoffeeItemByIdQuery = { __typename?: 'Query', getCoffeeItemById?: { __typename?: 'CoffeeItemDetail', id?: number | null, name?: string | null, roaster?: string | null, roast?: string | null, locCountry?: string | null, origin1?: string | null, origin2?: string | null, price?: number | null, rating?: number | null, desc?: string | null, createdAt?: string | null, updatedAt?: string | null, likesCount?: number | null, userLiked?: boolean | null, tags?: Array<{ __typename?: 'Tag', id?: number | null, name?: string | null } | null> | null, comments?: Array<{ __typename?: 'CommentDetail', id?: number | null, userId?: string | null, content?: string | null, createdAt?: string | null } | null> | null } | null };

export type GetCoffeeItemsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filterTags: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCoffeeItemsQuery = { __typename?: 'Query', coffeeItems?: { __typename?: 'CoffeeItemConnection', hasNextPage?: boolean | null, items?: Array<{ __typename?: 'CoffeeItem', id?: number | null, name?: string | null, roaster?: string | null, price?: number | null, desc?: string | null, rating?: number | null, tags?: Array<{ __typename?: 'Tag', id?: number | null, name?: string | null } | null> | null } | null> | null } | null };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tag', id?: number | null, name?: string | null }> };

export type GetLikedCoffeeStatQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLikedCoffeeStatQuery = { __typename?: 'Query', getLikedCoffeeStats: { __typename?: 'CoffeeStats', tags: Array<{ __typename?: 'TagStat', tag: string, id?: number | null, count: number }>, countries: Array<{ __typename?: 'CountryStat', country: string, count: number }> } };

export type GetLikedCoffeeStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLikedCoffeeStatsQuery = { __typename?: 'Query', getLikedCoffeeStats: { __typename?: 'CoffeeStats', tags: Array<{ __typename?: 'TagStat', tag: string, count: number }>, countries: Array<{ __typename?: 'CountryStat', country: string, count: number }> } };

export type CoffeeItems2QueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filterTags: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
}>;


export type CoffeeItems2Query = { __typename?: 'Query', coffeeItems?: { __typename?: 'CoffeeItemConnection', hasNextPage?: boolean | null, items?: Array<{ __typename?: 'CoffeeItem', id?: number | null, name?: string | null, roaster?: string | null, price?: number | null, desc?: string | null, rating?: number | null, tags?: Array<{ __typename?: 'Tag', id?: number | null, name?: string | null } | null> | null } | null> | null } | null };

export type CoffeeItemsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filterTags: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type CoffeeItemsQuery = { __typename?: 'Query', coffeeItems?: { __typename?: 'CoffeeItemConnection', hasNextPage?: boolean | null, items?: Array<{ __typename?: 'CoffeeItem', id?: number | null, name?: string | null, roaster?: string | null, price?: number | null, desc?: string | null, rating?: number | null, tags?: Array<{ __typename?: 'Tag', id?: number | null, name?: string | null } | null> | null } | null> | null } | null };


export const SetLikeCoffeeItemDocument = gql`
    mutation SetLikeCoffeeItem($id: Int!, $liked: Boolean!) {
  setLikeCoffeeItem(id: $id, liked: $liked) {
    coffeeItemId
    liked
  }
}
    `;
export type SetLikeCoffeeItemMutationFn = Apollo.MutationFunction<SetLikeCoffeeItemMutation, SetLikeCoffeeItemMutationVariables>;

/**
 * __useSetLikeCoffeeItemMutation__
 *
 * To run a mutation, you first call `useSetLikeCoffeeItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLikeCoffeeItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLikeCoffeeItemMutation, { data, loading, error }] = useSetLikeCoffeeItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      liked: // value for 'liked'
 *   },
 * });
 */
export function useSetLikeCoffeeItemMutation(baseOptions?: Apollo.MutationHookOptions<SetLikeCoffeeItemMutation, SetLikeCoffeeItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetLikeCoffeeItemMutation, SetLikeCoffeeItemMutationVariables>(SetLikeCoffeeItemDocument, options);
      }
export type SetLikeCoffeeItemMutationHookResult = ReturnType<typeof useSetLikeCoffeeItemMutation>;
export type SetLikeCoffeeItemMutationResult = Apollo.MutationResult<SetLikeCoffeeItemMutation>;
export type SetLikeCoffeeItemMutationOptions = Apollo.BaseMutationOptions<SetLikeCoffeeItemMutation, SetLikeCoffeeItemMutationVariables>;
export const AddCommentDocument = gql`
    mutation AddComment($coffeeItemId: Int!, $content: String!) {
  addComment(coffeeItemId: $coffeeItemId, content: $content) {
    id
    userId
    coffeeItemId
    content
    createdAt
  }
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      coffeeItemId: // value for 'coffeeItemId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const GetCoffeeItemByIdDocument = gql`
    query GetCoffeeItemById($id: Int!) {
  getCoffeeItemById(id: $id) {
    id
    name
    roaster
    roast
    locCountry
    origin1
    origin2
    price
    rating
    desc
    createdAt
    updatedAt
    tags {
      id
      name
    }
    likesCount
    comments {
      id
      userId
      content
      createdAt
    }
    userLiked
  }
}
    `;

/**
 * __useGetCoffeeItemByIdQuery__
 *
 * To run a query within a React component, call `useGetCoffeeItemByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoffeeItemByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoffeeItemByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCoffeeItemByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCoffeeItemByIdQuery, GetCoffeeItemByIdQueryVariables> & ({ variables: GetCoffeeItemByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoffeeItemByIdQuery, GetCoffeeItemByIdQueryVariables>(GetCoffeeItemByIdDocument, options);
      }
export function useGetCoffeeItemByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoffeeItemByIdQuery, GetCoffeeItemByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoffeeItemByIdQuery, GetCoffeeItemByIdQueryVariables>(GetCoffeeItemByIdDocument, options);
        }
export function useGetCoffeeItemByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCoffeeItemByIdQuery, GetCoffeeItemByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoffeeItemByIdQuery, GetCoffeeItemByIdQueryVariables>(GetCoffeeItemByIdDocument, options);
        }
export type GetCoffeeItemByIdQueryHookResult = ReturnType<typeof useGetCoffeeItemByIdQuery>;
export type GetCoffeeItemByIdLazyQueryHookResult = ReturnType<typeof useGetCoffeeItemByIdLazyQuery>;
export type GetCoffeeItemByIdSuspenseQueryHookResult = ReturnType<typeof useGetCoffeeItemByIdSuspenseQuery>;
export type GetCoffeeItemByIdQueryResult = Apollo.QueryResult<GetCoffeeItemByIdQuery, GetCoffeeItemByIdQueryVariables>;
export const GetCoffeeItemsDocument = gql`
    query GetCoffeeItems($page: Int!, $pageSize: Int!, $filterTags: [Int!]!, $sortBy: String, $sortOrder: String) {
  coffeeItems(
    page: $page
    pageSize: $pageSize
    filterTags: $filterTags
    sortBy: $sortBy
    sortOrder: $sortOrder
  ) {
    hasNextPage
    items {
      id
      name
      roaster
      price
      desc
      rating
      tags {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetCoffeeItemsQuery__
 *
 * To run a query within a React component, call `useGetCoffeeItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoffeeItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoffeeItemsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      filterTags: // value for 'filterTags'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useGetCoffeeItemsQuery(baseOptions: Apollo.QueryHookOptions<GetCoffeeItemsQuery, GetCoffeeItemsQueryVariables> & ({ variables: GetCoffeeItemsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoffeeItemsQuery, GetCoffeeItemsQueryVariables>(GetCoffeeItemsDocument, options);
      }
export function useGetCoffeeItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoffeeItemsQuery, GetCoffeeItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoffeeItemsQuery, GetCoffeeItemsQueryVariables>(GetCoffeeItemsDocument, options);
        }
export function useGetCoffeeItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCoffeeItemsQuery, GetCoffeeItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoffeeItemsQuery, GetCoffeeItemsQueryVariables>(GetCoffeeItemsDocument, options);
        }
export type GetCoffeeItemsQueryHookResult = ReturnType<typeof useGetCoffeeItemsQuery>;
export type GetCoffeeItemsLazyQueryHookResult = ReturnType<typeof useGetCoffeeItemsLazyQuery>;
export type GetCoffeeItemsSuspenseQueryHookResult = ReturnType<typeof useGetCoffeeItemsSuspenseQuery>;
export type GetCoffeeItemsQueryResult = Apollo.QueryResult<GetCoffeeItemsQuery, GetCoffeeItemsQueryVariables>;
export const GetTagsDocument = gql`
    query GetTags {
  getTags {
    id
    name
  }
}
    `;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export function useGetTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsSuspenseQueryHookResult = ReturnType<typeof useGetTagsSuspenseQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const GetLikedCoffeeStatDocument = gql`
    query GetLikedCoffeeStat {
  getLikedCoffeeStats {
    tags {
      tag
      id
      count
    }
    countries {
      country
      count
    }
  }
}
    `;

/**
 * __useGetLikedCoffeeStatQuery__
 *
 * To run a query within a React component, call `useGetLikedCoffeeStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLikedCoffeeStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLikedCoffeeStatQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLikedCoffeeStatQuery(baseOptions?: Apollo.QueryHookOptions<GetLikedCoffeeStatQuery, GetLikedCoffeeStatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLikedCoffeeStatQuery, GetLikedCoffeeStatQueryVariables>(GetLikedCoffeeStatDocument, options);
      }
export function useGetLikedCoffeeStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLikedCoffeeStatQuery, GetLikedCoffeeStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLikedCoffeeStatQuery, GetLikedCoffeeStatQueryVariables>(GetLikedCoffeeStatDocument, options);
        }
export function useGetLikedCoffeeStatSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLikedCoffeeStatQuery, GetLikedCoffeeStatQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLikedCoffeeStatQuery, GetLikedCoffeeStatQueryVariables>(GetLikedCoffeeStatDocument, options);
        }
export type GetLikedCoffeeStatQueryHookResult = ReturnType<typeof useGetLikedCoffeeStatQuery>;
export type GetLikedCoffeeStatLazyQueryHookResult = ReturnType<typeof useGetLikedCoffeeStatLazyQuery>;
export type GetLikedCoffeeStatSuspenseQueryHookResult = ReturnType<typeof useGetLikedCoffeeStatSuspenseQuery>;
export type GetLikedCoffeeStatQueryResult = Apollo.QueryResult<GetLikedCoffeeStatQuery, GetLikedCoffeeStatQueryVariables>;
export const GetLikedCoffeeStatsDocument = gql`
    query GetLikedCoffeeStats {
  getLikedCoffeeStats {
    tags {
      tag
      count
    }
    countries {
      country
      count
    }
  }
}
    `;

/**
 * __useGetLikedCoffeeStatsQuery__
 *
 * To run a query within a React component, call `useGetLikedCoffeeStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLikedCoffeeStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLikedCoffeeStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLikedCoffeeStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetLikedCoffeeStatsQuery, GetLikedCoffeeStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLikedCoffeeStatsQuery, GetLikedCoffeeStatsQueryVariables>(GetLikedCoffeeStatsDocument, options);
      }
export function useGetLikedCoffeeStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLikedCoffeeStatsQuery, GetLikedCoffeeStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLikedCoffeeStatsQuery, GetLikedCoffeeStatsQueryVariables>(GetLikedCoffeeStatsDocument, options);
        }
export function useGetLikedCoffeeStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLikedCoffeeStatsQuery, GetLikedCoffeeStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLikedCoffeeStatsQuery, GetLikedCoffeeStatsQueryVariables>(GetLikedCoffeeStatsDocument, options);
        }
export type GetLikedCoffeeStatsQueryHookResult = ReturnType<typeof useGetLikedCoffeeStatsQuery>;
export type GetLikedCoffeeStatsLazyQueryHookResult = ReturnType<typeof useGetLikedCoffeeStatsLazyQuery>;
export type GetLikedCoffeeStatsSuspenseQueryHookResult = ReturnType<typeof useGetLikedCoffeeStatsSuspenseQuery>;
export type GetLikedCoffeeStatsQueryResult = Apollo.QueryResult<GetLikedCoffeeStatsQuery, GetLikedCoffeeStatsQueryVariables>;
export const CoffeeItems2Document = gql`
    query CoffeeItems2($page: Int!, $pageSize: Int!, $filterTags: [Int!]!, $sortBy: String, $sortOrder: String) {
  coffeeItems(
    page: $page
    pageSize: $pageSize
    filterTags: $filterTags
    sortBy: $sortBy
    sortOrder: $sortOrder
  ) {
    hasNextPage
    items {
      id
      name
      roaster
      price
      desc
      rating
      tags {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useCoffeeItems2Query__
 *
 * To run a query within a React component, call `useCoffeeItems2Query` and pass it any options that fit your needs.
 * When your component renders, `useCoffeeItems2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoffeeItems2Query({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      filterTags: // value for 'filterTags'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useCoffeeItems2Query(baseOptions: Apollo.QueryHookOptions<CoffeeItems2Query, CoffeeItems2QueryVariables> & ({ variables: CoffeeItems2QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoffeeItems2Query, CoffeeItems2QueryVariables>(CoffeeItems2Document, options);
      }
export function useCoffeeItems2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoffeeItems2Query, CoffeeItems2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoffeeItems2Query, CoffeeItems2QueryVariables>(CoffeeItems2Document, options);
        }
export function useCoffeeItems2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CoffeeItems2Query, CoffeeItems2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CoffeeItems2Query, CoffeeItems2QueryVariables>(CoffeeItems2Document, options);
        }
export type CoffeeItems2QueryHookResult = ReturnType<typeof useCoffeeItems2Query>;
export type CoffeeItems2LazyQueryHookResult = ReturnType<typeof useCoffeeItems2LazyQuery>;
export type CoffeeItems2SuspenseQueryHookResult = ReturnType<typeof useCoffeeItems2SuspenseQuery>;
export type CoffeeItems2QueryResult = Apollo.QueryResult<CoffeeItems2Query, CoffeeItems2QueryVariables>;
export const CoffeeItemsDocument = gql`
    query CoffeeItems($page: Int!, $pageSize: Int!, $filterTags: [Int!]!) {
  coffeeItems(page: $page, pageSize: $pageSize, filterTags: $filterTags) {
    hasNextPage
    items {
      id
      name
      roaster
      price
      desc
      rating
      tags {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useCoffeeItemsQuery__
 *
 * To run a query within a React component, call `useCoffeeItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoffeeItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoffeeItemsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      filterTags: // value for 'filterTags'
 *   },
 * });
 */
export function useCoffeeItemsQuery(baseOptions: Apollo.QueryHookOptions<CoffeeItemsQuery, CoffeeItemsQueryVariables> & ({ variables: CoffeeItemsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoffeeItemsQuery, CoffeeItemsQueryVariables>(CoffeeItemsDocument, options);
      }
export function useCoffeeItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoffeeItemsQuery, CoffeeItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoffeeItemsQuery, CoffeeItemsQueryVariables>(CoffeeItemsDocument, options);
        }
export function useCoffeeItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CoffeeItemsQuery, CoffeeItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CoffeeItemsQuery, CoffeeItemsQueryVariables>(CoffeeItemsDocument, options);
        }
export type CoffeeItemsQueryHookResult = ReturnType<typeof useCoffeeItemsQuery>;
export type CoffeeItemsLazyQueryHookResult = ReturnType<typeof useCoffeeItemsLazyQuery>;
export type CoffeeItemsSuspenseQueryHookResult = ReturnType<typeof useCoffeeItemsSuspenseQuery>;
export type CoffeeItemsQueryResult = Apollo.QueryResult<CoffeeItemsQuery, CoffeeItemsQueryVariables>;