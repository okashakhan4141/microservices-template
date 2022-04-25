import express from 'express';

const router = express.Router();

router.get('/api/bill/payments/billers', async (req, res) => {
  const billerType: any = req.query.type;

  const billers = {
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

  res.status(200).send(billers[billerType]);
});

export { router as BillersRouter };
