import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

router.get(
  '/api/bill/payments/multiple',
  async (req: Request, res: Response) => {
    // console.log('Multiple');
    res.status(200).send({});
  }
);

export { router as MultipleBillsRouter };
