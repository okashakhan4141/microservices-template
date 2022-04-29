import express from 'express';
import { Request, Response } from 'express';
const request = require('request');

const router = express.Router();

router.post('/api/sms/params', async (req: Request, res: Response) => {
  const options = {
    url: 'https://stagingsms.useboom.net/api/v1/message/send/params',
    json: true,
    headers: {
      authorization: `${req.headers['authorization']}`,
    },
    body: req.body,
  };

  request.post(options, (err: Error, response: any, body: any) => {
    err ? res.send(err) : res.send(body);
  });
});

export { router as sendSmsParamsRouter };
