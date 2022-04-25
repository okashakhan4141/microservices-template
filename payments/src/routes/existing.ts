import express from 'express';

const router = express.Router();

router.get('/api/bill/payments/existing', async (req, res) => {
  console.log(req.query.uid);

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

  res.status(200).send(existing);
});

export { router as ExistingPaymentRouter };
