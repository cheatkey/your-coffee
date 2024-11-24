import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { signupToSupabase } from "./utils/supabaseAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

interface SignupPageProps {}

const SignupPage = ({}: SignupPageProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (formValue: FormData) => {
    const { data, error } = await signupToSupabase(formValue);

    if (!!error) {
      toast.error(`회원가입 중 에러가 발생했습니다.\n${error}`);
    }

    toast.success(`${data.user?.email}님, 회원가입이 완료되었습니다.`);
    navigate("/");
  };

  return (
    <div className="w-full bg-white pt-[5vh]">
      <div className="px-6 py-8 w-full">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">계정 만들기</h1>
            <p className="mt-2 text-base text-gray-600">
              당신의 커피와 함께하는 여정을 시작하세요
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  이름
                </Label>
                <Input
                  id="name"
                  {...register("name", { required: "이름을 입력해주세요." })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="홍길동"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email-address"
                  className="text-sm font-medium text-gray-700"
                >
                  이메일
                </Label>
                <Input
                  id="email-address"
                  {...register("email", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "유효한 이메일 주소를 입력해주세요.",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
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
                  type="password"
                  {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                    minLength: {
                      value: 6,
                      message: "비밀번호는 최소 6자리 이상이어야 합니다.",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password-confirm"
                  className="text-sm font-medium text-gray-700"
                >
                  비밀번호 확인
                </Label>
                <Input
                  id="password-confirm"
                  type="password"
                  {...register("passwordConfirm", {
                    required: "비밀번호 확인을 입력해주세요.",
                    validate: (value) =>
                      value === watch("password") ||
                      "비밀번호가 일치하지 않습니다.",
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-sm">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg"
            >
              계정 만들기
            </Button>
          </form>

          <div className="text-center">
            <a href="/login" className="text-[#4A7AFF] text-sm font-medium">
              이미 계정이 있으신가요? 로그인하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
