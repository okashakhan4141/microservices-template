const express = require('express');
const client = require('prom-client');
const responseTime = require('response-time');
import { Request, Response } from 'express';

import { PaymentMetrics } from '../models/paymentMetrics';

const router = express.Router();

const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

const databaseResponseTimeHistogram = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success'],
});

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

router.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      console.log(req.method, req.route.path, res.statusCode);
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

router.get('/api/bill/payments/metrics', async (req, res) => {
  // console.log(client.collectDefaultMetrics.metricsList);

  const ret = await client.register.metrics();

  const metric = new PaymentMetrics({
    date: new Date(),
    metrics: ret,
  });

  metric.save();

  res.set('Content-Type', client.register.contentType);
  res.send(ret);

  client.register.resetMetrics();
});

export {
  router as prometheusRouter,
  databaseResponseTimeHistogram as dbMetrics,
};
