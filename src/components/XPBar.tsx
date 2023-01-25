import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import { getMaxXp } from "../utils/xp";

const XPBar = () => {
  const { data: user } = api.users.getUser.useQuery();

  return (
    <div className="fixed bottom-0 left-0 h-3 w-full bg-lightbackground pl-8">
      <div
        className="h-full bg-primary"
        style={{
          width: user ? `${(user.xp / getMaxXp(user.level)) * 100}%` : "0%",
        }}
      />
    </div>
  );
};

export default XPBar;
