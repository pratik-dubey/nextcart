import mongoose from "mongoose";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: "user" | "deliveryBoy" | "admin";
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "deliveryBoy", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// here we have wrote mongoose.models.User || mongoose.model("User", userSchema) instead of mongoose.model("User", userSchema) simply because we are using next js and here in every request backend reloads whole thing and so while reloading it tries to recreate already existing USer model in mongoose models registry
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
