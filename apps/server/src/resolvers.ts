import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { countBy, map, orderBy } from "lodash";

const prisma = new PrismaClient();

const queries = {
  coffeeItems: async (
    {
      page = 1,
      pageSize = 10,
      sortBy,
      sortOrder = "asc",
      filterCountry,
      filterTags,
    }: {
      page: number;
      pageSize: number;
      sortBy?: string;
      sortOrder: "asc" | "desc";
      filterCountry?: string;
      filterTags?: number[];
    },
    req: Request
  ) => {
    console.log(sortBy, sortOrder);
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (filterCountry) where.locCountry = filterCountry;
    if (filterTags && filterTags.length > 0) {
      where.AND = filterTags.map((tagId) => ({
        tags: {
          some: {
            tagId: tagId,
          },
        },
      }));
    }

    const orderBy = sortBy ? { [sortBy]: sortOrder } : undefined;

    const coffeeItems = await prisma.coffeeItem.findMany({
      skip,
      take: pageSize,
      where,
      orderBy,
      include: { tags: { include: { tag: true } } },
    });

    const totalItems = await prisma.coffeeItem.count({ where });
    const hasNextPage = totalItems > skip + pageSize;

    return {
      items: coffeeItems.map((item) => ({
        ...item,
        tags: item.tags.map((tagRelation) => ({
          id: tagRelation.tag.id,
          name: tagRelation.tag.name,
        })),
      })),
      hasNextPage,
    };
  },

  getCoffeeItemById: async ({ id }: { id: number }, req: Request) => {
    const coffeeItem = await prisma.coffeeItem.findUnique({
      where: { id },
      include: {
        tags: { include: { tag: true } },
        comments: true,
        _count: {
          select: { likes: true },
        },
      },
    });

    if (!coffeeItem) {
      throw new Error("Not found");
    }

    const userLiked =
      (await prisma.like.findFirst({
        where: {
          coffeeItemId: id,
          userId: req.user?.id,
        },
      })) !== null;

    return {
      ...coffeeItem,
      tags: coffeeItem.tags.map((tagRelation) => ({
        id: tagRelation.tag.id,
        name: tagRelation.tag.name,
      })),
      likesCount: coffeeItem._count.likes,
      userLiked,
      comments: coffeeItem.comments.map((comment) => ({
        id: comment.id,
        userId: comment.userId,
        content: comment.content,
        createdAt: comment.createdAt,
      })),
    };
  },

  getTags: async () => {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return tags;
  },

  getLikedCoffeeStats: async (_: unknown, req: Request) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const likedCoffees = await prisma.like.findMany({
      where: { userId },
      select: {
        coffeeItem: {
          select: {
            locCountry: true,
            tags: {
              select: {
                tag: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const tags = likedCoffees.flatMap((like) =>
      like.coffeeItem.tags.map((tagRelation) => ({
        id: tagRelation.tag.id,
        name: tagRelation.tag.name,
      }))
    );

    const tagStats = map(
      countBy(tags, (tag) => `${tag.id}|${tag.name}`),
      (count, key) => {
        const [id, name] = key.split("|");
        return { id: Number(id), tag: name, count };
      }
    );

    const tagRanking = orderBy(tagStats, "count", "desc").slice(0, 6);

    return {
      tags: tagRanking,
    };
  },
};

const mutations = {
  setLikeCoffeeItem: async (
    { id, liked }: { id: number; liked: boolean },
    req: Request
  ) => {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const coffeeItem = await prisma.coffeeItem.findUnique({
      where: { id },
    });

    if (!coffeeItem) {
      throw new Error("Coffee item not found");
    }

    if (liked) {
      await prisma.like.create({
        data: {
          coffeeItemId: id,
          userId: req.user.id,
        },
      });

      return {
        coffeeItemId: id,
        liked,
      };
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        coffeeItemId: id,
        userId: req.user.id,
      },
    });
    if (!existingLike) {
      throw new Error("Not found");
    }
    await prisma.like.delete({
      where: { id: existingLike.id },
    });

    return {
      coffeeItemId: id,
      liked,
    };
  },

  addComment: async (
    { coffeeItemId, content }: { coffeeItemId: number; content: string },
    req: Request
  ) => {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const coffeeItem = await prisma.coffeeItem.findUnique({
      where: { id: coffeeItemId },
    });
    if (!coffeeItem) {
      throw new Error("Coffee item not found");
    }

    const newComment = await prisma.comment.create({
      data: {
        userId: req.user.id,
        coffeeItemId,
        content,
      },
    });

    return newComment;
  },
};

export const root = {
  ...queries,
  ...mutations,
};
