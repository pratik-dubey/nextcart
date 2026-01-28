import { auth } from "@/auth";
import AdminDashboard from "@/components/AdminDashboard";
import DeliveryBoy from "@/components/DeliveryBoy";
import EditMobileAndRole from "@/components/EditMobileAndRole";
import Footer from "@/components/Footer";
import GeoUpdater from "@/components/GeoUpdater";
import Nav from "@/components/Nav";
import UserDashboard from "@/components/UserDashboard";
import connectDb from "@/lib/db";
import Grocery, { IGrocery } from "@/models/grocery.model";
import User from "@/models/user.model";
import { redirect } from "next/navigation";

async function Home(props:{searchParams:Promise<{q:string}>}) {

  const searchParams = (await props.searchParams)
  // console.log(searchParams)
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

  let groceryList:IGrocery[]=[]

if(user.role==="user"){
  if(searchParams.q){
    groceryList=await Grocery.find({
     $or:[
      { name: { $regex: searchParams?.q || "", $options: "i" } },
    { category: { $regex: searchParams?.q || "", $options: "i" } },
     ]
    })
  }else{
    groceryList=await Grocery.find({})
     

  }
}

  // stringified json data to plain data before passing it to client component else it cannot parse it
  const plainUser = JSON.parse(JSON.stringify(user));
  return (
    <>
      <Nav user={plainUser} />
      <GeoUpdater userId={plainUser._id}/>
      {user.role == "user" ? (
        <UserDashboard groceryList={groceryList}/>
      ) : user.role == "admin" ? (
        <AdminDashboard />
      ) : (
        <DeliveryBoy />
      )}
      <Footer/> 
    </>
  );
}

export default Home;
