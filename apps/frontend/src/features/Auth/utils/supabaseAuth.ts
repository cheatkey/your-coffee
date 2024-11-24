import { supabase } from "@/lib/supabase";

export const loginToSupabase = async (formValue: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword(formValue);

  if (error) throw new Error(error.message);

  return data;
};

export const signupToSupabase = async (formValue: {
  email: string;
  password: string;
  name: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email: formValue.email,
    password: formValue.password,
    options: {
      data: {
        name: formValue.name,
      },
    },
  });

  return {
    data,
    error,
  };
};
