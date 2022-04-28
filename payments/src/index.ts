import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@dstransaction/common';

import { EnquiryRouter } from './routes/enquiry';
import { PaymentRouter } from './routes/payment';
import { BillersRouter } from './routes/billers';
import { ExistingPaymentRouter } from './routes/existing';
import { MultipleBillsRouter } from './routes/multiple';

import { prometheusRouter } from './routes/prometheus';

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

// Prom-Client middleware should be at top to detect routes
// All other routes/middlewares will go after this
app.use(prometheusRouter);

// Other routes
app.use(EnquiryRouter);
app.use(PaymentRouter);
app.use(BillersRouter);
app.use(ExistingPaymentRouter);
app.use(MultipleBillsRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://host.docker.internal:27017/billPayment');
    console.log('Bill Payment - Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Bill Payment - Listening on port 3000');
  });
};

start();
