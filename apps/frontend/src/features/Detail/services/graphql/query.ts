import { gql } from "@apollo/client";

export const GET_COFFEE_ITEM_BY_ID = gql`
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
