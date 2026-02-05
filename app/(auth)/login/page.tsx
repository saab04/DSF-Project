import LoginForm from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface Props {
  searchParams: { [key: string]: string | undefined };
}
const LoginPage = async ({ searchParams }: Props) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const callbackUrl = (await searchParams).callbackUrl || "/";
  if (user) {
    redirect(callbackUrl);
  }
  return <LoginForm />;
};

export default LoginPage;
