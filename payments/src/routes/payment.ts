import express from 'express';
import { Payment } from '../models/payments';
import { Request, Response } from 'express';

import { dbMetrics } from '../middlewares/prometheus';

const router = express.Router();

router.post('/api/bill/payments/pay', async (req: Request, res: Response) => {
  const newPayment = new Payment({
    biller: req.body.biller,
    refNo: req.body.referanceNo,
    amount: req.body.amount,
  });

  let label = {
    operation: 'Bill Payment',
  };

  const timer = dbMetrics.startTimer();

  try {
    const result = await newPayment.save();
    timer({ ...label, success: true });

    res.status(200).send(result);
  } catch (error) {
    timer({ ...label, success: false });

    res.status(400).send(error);
  }
});

export { router as PaymentRouter };
