const express = require('express');
const client = require('prom-client');
const responseTime = require('response-time');
import { Request, Response } from 'express';

import { Metrics } from '../models/metrics';

const router = express.Router();

const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code', 'response'],
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

      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
          response: [],
        },
        time * 1000
      );
    }
  })
);

router.get(
  '/api/bill/payments/metrics',
  async (req: Request, res: Response) => {

    const ret = await client.register.metrics();

    const metric = new Metrics({
      date: new Date(),
      metrics: ret,
    });

    metric.save();

    res.set('Content-Type', client.register.contentType);
    res.send(ret);

    client.register.resetMetrics();
  }
);

export {
  router as prometheusRouter,
  databaseResponseTimeHistogram as dbMetrics,
};
