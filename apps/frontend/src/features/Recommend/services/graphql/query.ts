import { gql } from "@apollo/client";

export const GET_LIKED_COFFEE_STATS = gql`
  query GetLikedCoffeeStat {
    getLikedCoffeeStats {
      tags {
        tag
        id
        count
      }
    }
  }
`;
