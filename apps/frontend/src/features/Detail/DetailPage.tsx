import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Send } from "lucide-react";
import { getScoreColor } from "./utils/score";
import { Textarea } from "@/components/ui/textarea";
import { useCoffeeItem } from "./hooks/useCoffeeItem";

interface DetailPageProps {}

const DetailPage = ({}: DetailPageProps) => {
  const id = Number(useParams().id);

  const [newComment, setNewComment] = useState("");

  const { coffee, setLikeCoffeeItem, addComment } = useCoffeeItem(id);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = newComment.trim();
    if (value.length > 0) {
      await addComment({
        variables: {
          coffeeItemId: id,
          content: value,
        },
      });
      setNewComment("");
    }
  };

  const comments = coffee?.comments ?? [];

  if (!coffee) return <></>;

  return (
    <main className="pb-20 w-full">
      <div className="relative w-full h-32 overflow-hidden mb-4">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>

      <div className="space-y-6 px-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold">{coffee.name}</h1>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {
              setLikeCoffeeItem({
                variables: {
                  id: id,
                  liked: !coffee.userLiked,
                },
              });
            }}
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-colors",
                coffee.userLiked
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground"
              )}
            />
            <span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full bg-primary text-[0.625rem] text-primary-foreground">
              {coffee.likesCount}
            </span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">${coffee.price}</span>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium text-white",
              getScoreColor(coffee.rating)
            )}
          >
            {coffee.rating}점
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {coffee.tags?.map((tag) => (
            <span
              key={tag?.id}
              className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm"
            >
              {tag?.name}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <h2 className="font-medium text-lg">로스터 정보</h2>
          <div className="space-y-1 text-muted-foreground">
            <p>로스터: {coffee.roaster}</p>
            <p>로스팅: {coffee.roast}</p>
            <p>위치: {coffee.locCountry}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-medium text-lg">원산지</h2>
          <div className="space-y-1 text-muted-foreground">
            <p>{coffee.origin1}</p>
            <p>{coffee.origin2}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-medium text-lg">상세 설명</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {coffee.desc}
          </p>
        </div>

        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between relative">
            <h2 className="font-medium text-lg">댓글</h2>
            <span className="absolute top-0 left-9 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full bg-primary text-[0.625rem] text-primary-foreground">
              {comments.length}
            </span>
          </div>

          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <Textarea
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              aria-label="댓글 입력"
            />
            <Button type="submit" size="icon" aria-label="댓글 작성">
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment?.id}
                  className="p-4 rounded-lg bg-muted text-sm"
                >
                  <p>{comment?.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
