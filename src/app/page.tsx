import { auth } from "@/auth";
import EditMobileAndRole from "@/components/EditMobileAndRole";
import Nav from "@/components/Nav";
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

  // stringified json data to plain data before passing it to client component else it cannot parse it
  const plainUser = JSON.parse(JSON.stringify(user));
  return (
    <>
      <Nav user={plainUser} />
    </>
  );
}

export default Home;
