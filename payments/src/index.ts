import express from "express";
import "express-async-errors";
import { json } from "body-parser";
// import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@dstransaction/common";

import { EnquiryRouter } from "./routes/enquiry";
import { PaymentRouter } from "./routes/payment";
import { CategoriesRouter } from "./routes/categories";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
    name: "session",
  })
);

app.use(EnquiryRouter);
app.use(PaymentRouter);
app.use(CategoriesRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});
  
app.use(errorHandler);
  
const start = async () => {  
  
//   try {
//     await mongoose.connect("mongodb://sms-mongo-srv:27017/sms");
//     console.log("SMS - Connected to MongoDb");
//   } catch (err) {
//     console.error(err);
//   }

  app.listen(3000, () => {
    console.log("Payments - Listening on port 3000");
  });
};
  
start();