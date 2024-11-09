import logger from './logger';
import allureReporter from '@wdio/allure-reporter';

enum LEVEL {
	ERROR = 'error',
	WARN = 'warn',
	INFO = 'info',
	DEBUG = 'debug',
}

export default class ReporterUtil {
	log(message: string, level: LEVEL = LEVEL.INFO) {
		if (level === LEVEL.ERROR) {
			logger.error(message);
		} else if (level === LEVEL.WARN) {
			logger.warn(message);
		} else if (level === LEVEL.INFO) {
			logger.info(message);
		} else if (level === LEVEL.DEBUG) {
			logger.debug(message);
		} else {
			logger.info(message);
		}
	}

	logStep(message: string) {
		this.log(message, LEVEL.INFO);
		allureReporter.addStep(message);
	}
}
