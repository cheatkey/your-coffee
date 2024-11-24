import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { loginToSupabase } from "./utils/supabaseAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleOnClickLogin = async ({ isTest }: { isTest: boolean }) => {
    try {
      await loginToSupabase(
        isTest ? { email: "test@test.com", password: "test" } : inputValue
      );
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        if ("Invalid login credentials" === error.message) {
          toast.error(
            "로그인에 실패했습니다. 로그인/패스워드를 다시 확인해주세요."
          );
          return;
        }
        toast.error("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <div className="w-full bg-white pt-[5vh]">
      <div className="px-6 py-8 w-full">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">당신의 커피</h1>
            <p className="mt-2 text-base text-gray-600">
              로그인하고 다양한 커피를 만나보세요
            </p>
          </div>

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email-address"
                  className="text-sm font-medium text-gray-700"
                >
                  이메일
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  onChange={(e) => {
                    setInputValue((v) => ({
                      ...v,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  비밀번호
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  onChange={(e) => {
                    setInputValue((v) => ({
                      ...v,
                      password: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <Button
              onClick={() => {
                handleOnClickLogin({ isTest: false });
              }}
              type="button"
              className="w-full py-3 bg-black text-white rounded-lg"
            >
              로그인
            </Button>

            <Button
              onClick={() => {
                handleOnClickLogin({ isTest: true });
              }}
              type="button"
              variant="outline"
              className="w-full py-3 bg-white text-black border border-gray-200 rounded-lg"
            >
              테스트용 계정으로 접속하기
            </Button>
          </form>

          <div className="text-center">
            <a href="/signup" className="text-[#4A7AFF] text-sm font-medium">
              새로운 계정 만들기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
