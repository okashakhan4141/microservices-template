import express from 'express';
import { Request, Response } from 'express';
const i18n = require('i18n');
const path = require('path');

const router = express.Router();

i18n.configure({
    // locales: ["en", "fr"],
    defaultLocale: 'en',
    autoReload: true,
    directory: path.join(__dirname, '..', 'locales')
});

router.use((req: Request, res: Response, next: any) => {
    if (req.headers['accept-language']) {
        i18n.setLocale(req.headers['accept-language']);
    } else {
        i18n.setLocale('en');
    }
    next();
});

export { router as localization };