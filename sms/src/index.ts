import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@dstransaction/common';

import { sendSmsRouter } from './routes/sms';
import { sendSmsParamsRouter } from './routes/param-sms';
import { sendOTPRouter } from './routes/otp';

import { prometheusRouter } from './middlewares/prometheus';

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

app.use(sendSmsRouter);
app.use(sendSmsParamsRouter);
app.use(sendOTPRouter);

app.all('*', async (req: any, res: any) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://host.docker.internal:27017/digicel');
    console.log('SMS - Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('SMS - Listening on port 3000');
  });
};

start();
