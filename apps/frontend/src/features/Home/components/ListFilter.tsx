import React, { useState } from "react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { Filter, SortDesc } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_TAG_LIST } from "../services/graphql/query";
import { Tag } from "@/types/graphql/generated";
import { useFilterContext } from "../hooks/useFilterContext";

interface ListFilterProps {}

const ListFilter = ({}: ListFilterProps) => {
  const { data } = useQuery<{ getTags: Tag[] }>(GET_TAG_LIST);
  const tagList = data?.getTags ?? [];

  const { filterSetting, setFilterSetting } = useFilterContext();

  const SortbyButtons = () => {
    const menu = [
      {
        name: "가격",
        value: "price",
      },
      {
        name: "점수",
        value: "rating",
      },
    ] as const;

    return menu.map((item) => (
      <Button
        key={item.value}
        size={"sm"}
        variant={filterSetting.sortBy === item.value ? "default" : "outline"}
        onClick={() => {
          setFilterSetting((v) => ({
            ...v,
            sortBy: item.value,
          }));
        }}
      >
        {item.name}
      </Button>
    ));
  };

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[60%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-muted-foreground/5 rounded-t-[10px] flex-1 overflow-y-scroll">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground mb-8" />
            <div className="max-w-md mx-auto">
              <div className="space-y-4 flex flex-col gap-4">
                <div>
                  <h3 className="flex flex-row gap-0 items-center mb-2">
                    {SortbyButtons()}
                    <p className="font-medium ml-1">로 정렬</p>
                  </h3>

                  <Button
                    onClick={() => {
                      setFilterSetting((v) => ({
                        ...v,
                        sorting: v.sorting === "asc" ? "desc" : "asc",
                      }));
                    }}
                    className="w-full"
                  >
                    <SortDesc className="mr-2 h-4 w-4" />
                    {filterSetting.sorting === "asc" ? `오름차순` : "내림차순"}
                  </Button>
                </div>

                <div>
                  <div className="relative">
                    <h3 className="font-medium mb-2">태그로 필터링</h3>
                    <span className="absolute -top-1 left-24 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full bg-primary text-[0.625rem] text-primary-foreground">
                      {filterSetting.tags.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tagList.map((tag) => (
                      <Button
                        key={tag.id}
                        variant={
                          filterSetting.tags.includes(tag.id!)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          setFilterSetting((v) => {
                            if (v.tags.includes(tag.id!)) {
                              return {
                                ...v,
                                tags: v.tags.filter((item) => item !== tag.id),
                              };
                            }

                            return {
                              ...v,
                              tags: [...v.tags, tag.id!],
                            };
                          });
                        }}
                      >
                        {tag.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ListFilter;
