import express from 'express';

const router = express.Router();

router.get('/api/bill/payments/multiple', async (req, res) => {
  console.log(req.body);
  res.status(200).send({});
});

export { router as MultipleBillsRouter };
