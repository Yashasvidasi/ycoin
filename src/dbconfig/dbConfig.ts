import mongoose, { mongo } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected");
    });

    connection.on("error", (err) => {
      console.log("Database Disconnected");
      console.log(err);
      process.exit();
    });
  } catch (err) {
    console.log(err);
  }
}
