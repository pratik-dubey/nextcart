// "Maan lo tumhare paas ek API route hai /api/user
// Har request ke time Next.js backend ko reload karta hai
// aur tumhara code fir se run hota hai.
// Matlab agar tumne likha:

// mongoose.connect(MONGO_URL)

// to ye line har baar execute hogi

// Result: MongoDB me multiple open connections
// - app slow, crash, aur warning 'Too many connections'."

// => => so the solution is that we store mongodb database connection in Global cache provided by Next js so that no subsequent mongo connections are being made during hot replacement

import mongoose from "mongoose";
const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("db error");
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// to store connection in global cache , we will create a object named mongoose in global which is declared in global.d.ts

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongodbUrl)
      .then((conn) => conn.connection);
  }
  try {
    const conn = await cached.promise;
    return conn;
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
