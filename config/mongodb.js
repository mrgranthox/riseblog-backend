import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Databse Connected"));

  await mongoose.connect(`${process.env.MONGODB_URL_NEW}/blog-post`);
};

export default connectDB;
