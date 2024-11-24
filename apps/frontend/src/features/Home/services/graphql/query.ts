import { gql } from "@apollo/client";

export const GET_COFFEE_ITEMS = gql`
  query GetCoffeeItems(
    $page: Int!
    $pageSize: Int!
    $filterTags: [Int!]!
    $sortBy: String
    $sortOrder: String
    $filterCountry: String
  ) {
    coffeeItems(
      page: $page
      pageSize: $pageSize
      filterTags: $filterTags
      sortBy: $sortBy
      sortOrder: $sortOrder
      filterCountry: $filterCountry
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

export const GET_TAG_LIST = gql`
  query GetTags {
    getTags {
      id
      name
    }
  }
`;
