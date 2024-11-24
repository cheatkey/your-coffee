import { useQuery, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { GET_COFFEE_ITEM_BY_ID } from "../services/graphql/query";
import {
  ADD_COMMENT,
  SET_LIKE_COFFEE_ITEM,
} from "../services/graphql/mutation";
import { CoffeeItemDetail } from "@/types/graphql/generated";

export const useCoffeeItem = (id: number) => {
  const { data, refetch } = useQuery<{ getCoffeeItemById: CoffeeItemDetail }>(
    GET_COFFEE_ITEM_BY_ID,
    {
      variables: { id },
    }
  );

  const [setLikeCoffeeItem] = useMutation(SET_LIKE_COFFEE_ITEM, {
    onCompleted: () => refetch(),
    onError: (error) => toast.error(`요청을 실패했습니다. ${error.message}`),
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: () => refetch(),
    onError: (error) => toast.error(`요청을 실패했습니다. ${error.message}`),
  });

  return {
    coffee: data?.getCoffeeItemById,
    refetch,
    setLikeCoffeeItem,
    addComment,
  };
};
