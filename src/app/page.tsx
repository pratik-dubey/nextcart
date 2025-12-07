import { auth } from "@/auth";
import EditMobileAndRole from "@/components/EditMobileAndRole";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";

async function Home() {
  await connectDb();
  const sess = await auth();
  console.log(sess);
  const user = await User.findById(sess?.user?.id);
  // console.log(user);
  if (!user) {
    redirect("/auth/signin");
  }

  const inComplete =
    !user.mobile || !user.role || (!user.mobile && user.role == "user");
  if (inComplete) {
    return <EditMobileAndRole />;
  }
  return <div>hey there</div>;
}

export default Home;
