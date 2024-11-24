import { CoffeeItem, QueryCoffeeItemsArgs } from "@/types/graphql/generated";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GET_COFFEE_ITEMS } from "../services/graphql/query";
import { FilterContextType } from "./useFilterContext";

const useCoffeeItemList = (
  filterSetting: FilterContextType["filterSetting"]
) => {
  const [page, setPage] = useState(1);
  const [coffeeItems, setCoffeeItems] = useState<CoffeeItem[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const variables: QueryCoffeeItemsArgs = useMemo(
    () => ({
      page,
      pageSize: 10,
      filterTags: filterSetting.tags,
      sortBy: filterSetting.sortBy,
      sortOrder: filterSetting.sorting,
    }),
    [filterSetting.sortBy, filterSetting.sorting, filterSetting.tags, page]
  );

  useEffect(() => {
    setPage(1);
    setCoffeeItems([]);
    setHasNextPage(false);
  }, [filterSetting]);

  const { fetchMore, loading } = useQuery<{
    coffeeItems: { items: CoffeeItem[]; hasNextPage: boolean };
  }>(GET_COFFEE_ITEMS, {
    variables,
    onCompleted: (data) => {
      if (data?.coffeeItems.items) {
        setCoffeeItems((prev) => [...prev, ...data.coffeeItems.items]);
        setHasNextPage(data.coffeeItems.hasNextPage);
      }
    },
  });

  const loadMore = useCallback(() => {
    fetchMore({
      variables: { ...variables, page: page + 1 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        setPage((prevPage) => prevPage + 1);
        setCoffeeItems((prev) => [
          ...prev,
          ...fetchMoreResult.coffeeItems.items,
        ]);
        setHasNextPage(fetchMoreResult.coffeeItems.hasNextPage);

        return fetchMoreResult;
      },
    });
  }, [fetchMore, variables, page]);

  return {
    coffeeItems,
    loadMore,
    containerRef,
    hasNextPage,
    loading,
  };
};

export default useCoffeeItemList;
