import ReporterUtil from './ReporterUtil';
import { appPackage } from '../../config/conf';
const reporterUtil = new ReporterUtil();

async function restartApp(driver: WebdriverIO.Browser) {
	reporterUtil.logStep(`Restarting the app`);
	try {
		await driver.terminateApp(appPackage);
		await driver.activateApp(appPackage);
		reporterUtil.logStep(`App restarted`);
	} catch (error) {
		console.error('Error starting app', error);
		throw error;
	}
}

export { restartApp };
