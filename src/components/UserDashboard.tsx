// import React from "react";
// import HeroSection from "./HeroSection";
// import CategorySlider from "./CategorySlider";
// import connectDb from "@/lib/db";
// import Grocery from "@/models/grocery.model";
// import GroceryItemCard from "./GroceryItemCard";

// interface IGrocery {
//   _id?: string;
//   name: string;
//   category: string;
//   price: string;
//   unit: string;
//   image: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// async function UserDashboard({groceryList}:{groceryList:IGrocery[]}) {
//   await connectDb();
//   // here we will be fetching groceries from grocery model and then map them by passing into GcoceryCard component to display them and like we sent plainUser to components by converting user into it similarly we will send plainGrocery to component as we cannot send groceries which is a server thing directly to a client component

//   // const groceries = await Grocery.find({});
//   const plainGrocery = JSON.parse(JSON.stringify(groceryList));
//   return (
//     <>
//       <HeroSection />
//       <CategorySlider />
//       <div className="w-[90%] md:w-[80%] mx-auto mt-10">
//         <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">
//           Popular Grocery Items
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {plainGrocery.map((item: IGrocery, index: number) => (
//             <GroceryItemCard key={index} item={item} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserDashboard;






import React from 'react'
import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'
import connectDb from '@/lib/db'
import Grocery, { IGrocery } from '@/models/grocery.model'
import GroceryItemCard from './GroceryItemCard'

async function UserDashboard({groceryList}:{groceryList:IGrocery[]}) {
await connectDb()
const plainGrocery = JSON.parse(JSON.stringify(groceryList))

  return (
    <>
      <HeroSection/>
      <CategorySlider/>
      <div className='w-[90%] md:w-[80%] mx-auto mt-10'>
        <h2 className='text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center'>Popular Grocery Items</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'> 
          {plainGrocery.map((item:any,index:number)=>(
        <GroceryItemCard key={index} item={item}/>
      ))}
      </div>

      </div>
     
    </>
  )
}

export default UserDashboard
