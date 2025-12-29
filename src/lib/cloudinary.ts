import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import { resolve } from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// now we'll write a function which will take file and convert it to first arrayBuffer and then to buffer which will be finally stored on cloudinary in node js setup and return a promise

const uploadOnCloudinary = async (file: Blob): Promise<string | null> => {
  if (!file) {
    return null;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // this will be eligible to get stored on cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url ?? null);
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default uploadOnCloudinary;
