// import httpContext from 'express-http-context';
import { createLogger, format, transports } from 'winston';
//import stringify from 'json-stringify-safe';
import stringify from 'fast-safe-stringify';
const { combine, timestamp, label, printf,colorize } = format;

// const PRODUCTION_LOG_LEVEL = process.env.PRODUCTION_LOG_LEVEL || 'debug';
// const MASKING_KEYS = process.env.MASKING_KEYS || "password, pin, motherMaidenName, businessAddress, userEnteredMotherMaiden";


const customFormat = printf((info) => {
    // const logObj = httpContext.get('logObj') || null;
    // const infoCopy = Object.assign({}, info, logObj);

    //let infoCopy = {}
    //Object.assign(infoCopy, logObj);
    //const Object.assign(infoCopy, info);
    //info = Object.assign(info, logObj);
    let log;

    log = `[${info.level}] ${info.timestamp} ${stringify(info.message)}`;
    return log;

    // if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production' ) {
    //     log = `[${infoCopy.level}] ${infoCopy.timestamp} ${stringify(infoCopy)}`;
    // } else {
    //     if (info.showDetails) {
    //         log = `${stringify(infoCopy)}`;    
    //     }
    //     else {
    //         log = `[${infoCopy.level}] ${infoCopy.timestamp} ${infoCopy.msisdn} ${infoCopy.requestID} ${stringify(infoCopy.message)}`
    //     }
    //     //if object contains sensitive property ( i.e. key value matches pin, mpin, password, CVV , credit card etc etc , NADRA, CNIC , Mother's name ), **** 
    //     log = maskInput(log);
    // }
    // if (info instanceof Error) {
    //     log = `[ ERROR ] ${info.timestamp} ${infoCopy.msisdn} ${infoCopy.requestID} ${stringify(info.message)} ${stringify(info.stack)} `
    //     //log = `[ERROR:] [${infoCopy.label}] ${infoCopy.timestamp} ${stringify(info.message)} ${stringify(info.stack)} ${stringify(infoCopy)}`
    // }
    // return log;
});

// const maskInput = (strLog) => {
//     let sensitiveKeys = MASKING_KEYS ? MASKING_KEYS.split(/[\s,]+/) : [];
//     let newMaskedString = strLog;
//     for (let key of sensitiveKeys) {
//         let keyToFind = `"${key}":`;
//         let regex = new RegExp(`${keyToFind}"[^"]+"`, 'gmi');
//         newMaskedString = newMaskedString.replace(regex, `${keyToFind}"*****"`);
//     }
//     return newMaskedString;
// }

const logger = createLogger({
    // level: 'info',
    format: combine(
        colorize(),
        label({ label: 'AccountManagement_MS' }),
        timestamp({ format: 'DD-MMM-YYYY HH:mm:ss' }),
        customFormat,
    ),
    transports: [
        // new winston.transports.File(config.winston.file),
        // new transports.Console(),
        new transports.Console({
            level: 'debug',
            handleExceptions: true,
        }),
    ],
    exitOnError: false, // do not exit on handled exceptions
});
export default logger;