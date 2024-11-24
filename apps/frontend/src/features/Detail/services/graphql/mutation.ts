import { gql } from "@apollo/client";

export const SET_LIKE_COFFEE_ITEM = gql`
  mutation SetLikeCoffeeItem($id: Int!, $liked: Boolean!) {
    setLikeCoffeeItem(id: $id, liked: $liked) {
      coffeeItemId
      liked
    }
  }
`;

export const ADD_COMMENT = gql`
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
