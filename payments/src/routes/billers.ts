import express from 'express';

import { Request, Response } from 'express';

const router = express.Router();

router.get(
  '/api/bill/payments/billers',
  async (req: Request, res: Response) => {
    const billerType: any = req.query.type;

    const billers: any = {
      electricity: [],
      gas: [],
      water: [
        { name: 'National Water Commision' },
        { name: 'Company Without Logo' },
      ],
      internet: [],
      telephone: [],
      creditCard: [],
    };

    // res['body'] = 'hi';
    res.status(200).send(billers[billerType]);
  }
);

export { router as BillersRouter };
