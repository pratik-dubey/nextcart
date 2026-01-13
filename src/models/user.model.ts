import mongoose from "mongoose";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
  location?: {
    type: {
      type: StringConstructor;
      enum: string[];
      default: string;
    };
    coordinates: {
      type: NumberConstructor[];
      default: number[];
    };
  },
  socketId: string | null,
  isOnline: Boolean
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
      required: false,
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
    image: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },
    socketId: {
      type: String,
      default: null
    },
    isOnline: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" })

// here we have wrote mongoose.models.User || mongoose.model("User", userSchema) instead of mongoose.model("User", userSchema) simply because we are using next js and here in every request backend reloads whole thing and so while reloading it tries to recreate already existing USer model in mongoose models registry
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
