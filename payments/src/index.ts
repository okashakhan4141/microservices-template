import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { Request, Response } from 'express';

import { errorHandler, NotFoundError } from '@dstransaction/common';

import { EnquiryRouter } from './routes/enquiry';
import { PaymentRouter } from './routes/payment';
import { BillersRouter } from './routes/billers';
import { ExistingPaymentRouter } from './routes/existing';
import { MultipleBillsRouter } from './routes/multiple';

import { prometheusRouter } from './routes/prometheus';

const i18n = require('i18n');

const app = express();

i18n.configure({
  // locales: ["en", "fr"],
  defaultLocale: 'en',
  autoReload: true,
  directory: __dirname + '/locales',
});

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

// own middleware setup
app.use((req: Request, res: Response, next: any) => {
  if (req.headers['accept-language']) {
    i18n.setLocale(req.headers['accept-language']);
  } else {
    i18n.setLocale('en');
  }
  next();
});

// Other routes
app.use(EnquiryRouter);
app.use(PaymentRouter);
app.use(BillersRouter);
app.use(ExistingPaymentRouter);
app.use(MultipleBillsRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://host.docker.internal:27017/digicel');
    console.log('Bill Payment - Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Bill Payment - Listening on port 3000');
  });
};

start();
