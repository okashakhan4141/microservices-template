import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

router.get(
  '/api/bill/payments/existing',
  async (req: Request, res: Response) => {
    let existing = [
      {
        type: 'electricity',
        company: 'JPS Co.',
        amount: 100,
        due: '2022-04-30',
      },
      {
        type: 'water',
        company: 'NWC',
        amount: 100,
        due: '2022-04-30',
      },
    ];

    /*
   will check existing payments
   and before returning check if there is new bill for that referance no?
   if yes, will return new details with due date etc
   else, will return with status -> "PAID"
  */

    res.status(200).send(existing);
  }
);

export { router as ExistingPaymentRouter };
