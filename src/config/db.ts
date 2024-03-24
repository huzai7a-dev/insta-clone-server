import mongoose from "mongoose";

const connectToDb = async () => {
  mongoose
    .connect(process.env.DB_CONNECTION || "")
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(`Couldn't connect to Database ${err}`);
    });
};

export default connectToDb;
