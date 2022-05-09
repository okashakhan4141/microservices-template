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

router.use((req: Request, res: Response, next: any) => {
  let oldSend = res.send;
  res.send = function (data: any): any {
    Object.assign(res, { resBody: data });

    const argumentsTyped: any = arguments;
    oldSend.apply(res, argumentsTyped);
  }
  next();
});

router.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {

      const myRes: any = res;
      // console.log('prom -> ', myRes.resBody);

      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
          response: myRes.resBody
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
      service: 'Bill Payments',
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
