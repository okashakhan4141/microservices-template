import express from 'express';

const router = express.Router();

router.post('/api/bill/payments/pay', async (req, res) => {
  console.log(req.body);

  res.status(200).send({
    message: 'SUCCESS',
  });
});

export { router as PaymentRouter };
