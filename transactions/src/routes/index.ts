import express, { Request, Response } from 'express';
import { Transaction } from '../models/transaction';

const router = express.Router();

router.get('/api/transactions', async (req: Request, res: Response) => {
  const transactions = await Transaction.find({});

  res.send(transactions);
});

export { router as indexTransactionRouter };
