import { config } from './wdio.conf';
import { appPackage } from './conf';

const appFilePath = process.env.APP_PATH || 'apps/WikipediaSample.apk';

const buildCapabilities = () => ({
	'appium:platformName': 'Android',
	maxInstances: 1,
	'appium:automationName': 'UiAutomator2',
	'appium:newCommandTimeout': 0,
	'appium:nativeWebScreenshot': true,
	'appium:autoGrantPermissions': true,
	'appium:noReset': true,
	'appium:app': appFilePath,
	'appium:appPackage': appPackage,
	'appium:appActivity': 'org.wikipedia.main.MainActivity',
});

config.capabilities = [buildCapabilities()];
export { config };
