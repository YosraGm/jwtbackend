const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(
    `mongoDB connected successfully : ${conn.connection.name}`.bgBlue
  );
};
module.exports = connectDB;
