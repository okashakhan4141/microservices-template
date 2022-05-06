import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

const i18n = require('i18n');

router.get(
  '/api/bill/payments/multiple',
  async (req: Request, res: Response) => {
    // console.log('Multiple');
    res.status(200).send(i18n.__('msg_success'));
  }
);

export { router as MultipleBillsRouter };
