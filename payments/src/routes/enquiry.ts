import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

router.get(
  '/api/bill/payments/enquire',
  async (req: Request, res: Response) => {
    res.status(200).send({
      message: 'SUCCESS',
      billDetails: {
        billingMonth: 'MAY',
        referanceNo: '0019220129',
        dueDate: '24/09/2022',
      },
    });
  }
);

export { router as EnquiryRouter };
