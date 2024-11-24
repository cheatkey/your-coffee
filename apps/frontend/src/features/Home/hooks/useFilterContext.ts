import { createContext, useContext, useEffect, useState } from "react";

export type FilterContextType = {
  filterSetting: {
    sortBy: "price" | "rating";
    sorting: "asc" | "desc";
    tags: number[];
  };
  setFilterSetting: React.Dispatch<
    React.SetStateAction<{
      sortBy: "price" | "rating";
      sorting: "asc" | "desc";
      tags: number[];
    }>
  >;
};

export const FilterContext = createContext<FilterContextType | null>(null);

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw Error("context Reference Error");

  return ctx;
};

export const useFilterState = () => {
  const SESSION_STORAGE_KEY = "filterSetting";

  const [filterSetting, setFilterSetting] = useState<
    FilterContextType["filterSetting"]
  >(() => {
    const storedSetting = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return storedSetting
      ? JSON.parse(storedSetting)
      : { sortBy: "rating", sorting: "desc", tags: [] };
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(filterSetting));
  }, [filterSetting]);

  return {
    filterSetting,
    setFilterSetting,
  };
};
