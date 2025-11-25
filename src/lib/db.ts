// "Maan lo tumhare paas ek API route hai /api/user
// Har request ke time Next.js backend ko reload karta hai
// aur tumhara code fir se run hota hai.
// Matlab agar tumne likha:

// js

// mongoose.connect(MONGO_URL)

// to ye line har baar execute hogi

// Result: MongoDB me multiple open connections
// - app slow, crash, aur warning 'Too many connections'."

// => => so the solution is that we store mongodb database connection in Global cache provided by Next js so that no subsequent mongo connections are being made during hot replacement

const mongodbUr1 = process.env.MONGODB_URL;

if (!mongodbUr1) {
  throw new Error("db error");
}
let cache = global.mongoose;
if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

// to store connection in global cache , we will create a object named mongoose in global which is declared in global.d.ts
