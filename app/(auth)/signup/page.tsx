import SignUpForm from "@/components/auth/SignUpForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard");
  }
  return <SignUpForm />;
};

export default RegisterPage;
