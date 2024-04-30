const mongoose = require("mongoose");

export const connectDB = () => {    
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("=========== connected to database =============");
    })
    .catch((err:any) => {
      console.log(err);
    });
};

