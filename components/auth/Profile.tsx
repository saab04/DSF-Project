import { getUsername } from "@/lib/auth";
import LogOutButton from "./LogOutButton";

const Profile = async () => {
  const username = await getUsername();
  return (
    <div>
      <p>Inloggad som: {username} </p>
      <LogOutButton />
    </div>
  );
};

export default Profile;
