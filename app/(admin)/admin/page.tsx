import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
const Admin = async () => {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/dashboard");
  }
  return <div>Admin</div>;
};

export default Admin;
