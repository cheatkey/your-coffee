import { useQuery } from "@apollo/client";
import React from "react";
import { GET_LIKED_COFFEE_STATS } from "./services/graphql/query";
import { CoffeeItem, CoffeeStats } from "@/types/graphql/generated";
import PieChartRenderer from "./components/PieChartRenderer";
import { GET_COFFEE_ITEMS } from "../Home/services/graphql/query";
import CoffeeCard from "@/components/CoffeeCard";
import { useNavigate } from "react-router-dom";

interface RecommendPageProps {}

const RecommendPage = ({}: RecommendPageProps) => {
  const navigate = useNavigate();
  const { data: statsData, loading: statsLoading } = useQuery<{
    getLikedCoffeeStats: CoffeeStats;
  }>(GET_LIKED_COFFEE_STATS);

  const tagRanking =
    statsData?.getLikedCoffeeStats.tags.map((v) => ({
      name: v.tag,
      count: v.count,
      id: v.id,
    })) ?? [];

  const { data: coffeeList } = useQuery<{
    coffeeItems: { items: CoffeeItem[]; hasNextPage: boolean };
  }>(GET_COFFEE_ITEMS, {
    variables: {
      page: 1,
      pageSize: 2,
      filterTags: tagRanking.slice(0, 2).map(({ id }) => id),
      sortBy: "rating",
      sortOrder: "desc",
    },
    skip: statsLoading || !statsData,
  });
  console.log("🚀 ~ RecommendPage ~ coffeeList:", coffeeList);

  if (statsLoading) return <></>;

  return (
    <div className="flex-col flex">
      <PieChartRenderer
        title={"선호하는 커피 태그 분석"}
        description={`"${tagRanking[0].name}"이 ${tagRanking[0].count}개 좋아요를 받았어요!`}
        data={tagRanking}
      />
      <p className="p-6 font-semibold text-lg">다음 커피는 어떠신가요?</p>
      {coffeeList?.coffeeItems.items.map((coffee) => (
        <CoffeeCard
          coffee={coffee}
          onClick={() => navigate(`/detail/${coffee.id!}`)}
        />
      ))}
    </div>
  );
};

export default RecommendPage;
