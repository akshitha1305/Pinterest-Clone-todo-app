import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;

const path = require('path');
export const log = createLogger({
    format: combine(
        label({
            label: 'Vendor View Service'
        }),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new transports.Console({ json: true, timestamp: false }),
        new transports.File({
            filename: path.join(__dirname, '../../logs/combined.log'),
            json: false
        }),
        new transports.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error',
            json: false
        })
    ],
    exceptionHandlers: [
        new transports.Console({
            json: false,
            timestamp: true
        }),
        new transports.File({
            filename: path.join(__dirname, '../../logs/exceptions.log'),
            json: false
        })
    ],
    exitOnError: false
});
