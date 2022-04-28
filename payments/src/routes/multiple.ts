import express from 'express';

const router = express.Router();

router.get('/api/bill/payments/multiple', async (req, res) => {
  // console.log('Multiple');
  res.status(200).send({});
});

export { router as MultipleBillsRouter };
