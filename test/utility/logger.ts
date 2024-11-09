import winston from 'winston';
import dotenv from 'dotenv';
dotenv.config();

let transports: winston.transport[] = [
	new winston.transports.File({
		filename: 'automation-util.log',
		format: winston.format.printf(({ timestamp, level, message }) => {
			return `${timestamp} ${level}: ${message}`;
		}),
	}),
];

if (process.env.logger === 'true') {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.printf(({ timestamp, level, message }) => {
					return `${timestamp} ${level}: ${message}`;
				})
			),
		})
	);
}
const logger = winston.createLogger({
	level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(({ timestamp, level, message }) => {
			return `${timestamp} ${level}: ${message}`;
		})
	),
	transports: transports,
});

export default logger;
