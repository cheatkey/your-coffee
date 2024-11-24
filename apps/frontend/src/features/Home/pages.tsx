import React, { useEffect } from "react";
import useCoffeeItemList from "./hooks/useCoffeeItemList";
import { useNavigate } from "react-router-dom";
import CoffeeList from "./components/CoffeeList";
import { Portal } from "react-portal";
import ListFilter from "./components/ListFilter";
import { useVirtualizedCoffeeList } from "./hooks/useVirtualizedCoffeeList";
import { FilterContext, useFilterState } from "./hooks/useFilterContext";

interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  const navigate = useNavigate();

  const { filterSetting, setFilterSetting } = useFilterState();

  const { coffeeItems, hasNextPage, loadMore, loading } =
    useCoffeeItemList(filterSetting);

  const { virtualizer, virtualItems, containerRef } =
    useVirtualizedCoffeeList(coffeeItems);

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();
    if (!lastItem) return;

    if (lastItem.index >= coffeeItems.length - 1 && !loading && hasNextPage) {
      loadMore();
    }
  }, [coffeeItems, hasNextPage, virtualItems, loadMore, loading]);

  return (
    <FilterContext.Provider
      value={{
        filterSetting,
        setFilterSetting,
      }}
    >
      <Portal node={document.getElementById("header-content")}>
        <ListFilter />
      </Portal>

      <div
        className="p-4 bg-gray-100 flex flex-col"
        onClick={() => {
          navigate("/recommend");
        }}
      >
        <p className="font-semibold text-gray-800 text-lg">맞춤 커피 추천</p>
        <p className="text-sm text-gray-700">
          당신의 선택을 반영한 최적의 커피 리스트를 확인하세요.
        </p>
      </div>

      <CoffeeList
        coffeeItems={coffeeItems}
        onCardClick={(id) => navigate(`/detail/${id}`)}
        virtualizer={virtualizer}
        containerRef={containerRef}
        virtualItems={virtualItems}
        loading={loading}
      />
    </FilterContext.Provider>
  );
};

export default HomePage;
