import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
// import mongoose from "mongoose";
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@dstransaction/common';

import { getRewardsRouter } from './routes/rewards';
// import { billPaymentRouter } from "./routes/payment";
// import { getTypesRouter } from "./routes/types";
// import { getCompaniesRouter } from "./routes/companies";

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
    name: 'session',
  })
);

app.use(getRewardsRouter);
// app.use(billPaymentRouter);
// app.use(getTypesRouter);
// app.use(getCompaniesRouter);

app.all('*', async (req, res) => {
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
    console.log('Rewards - Listening on port 3000');
  });
};

start();
