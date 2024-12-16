import { onBoardUser } from "@/actions/user";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await onBoardUser();
  const username = user && user.data?.email.split("@")[0];
  if (user?.status === 200 || user?.status === 201) {
    return redirect(`dashboard/${username}`);
  }
  return redirect("sign-in");
};
export default Dashboard;
