import { elementTimeout } from '../../config/wdio.conf';
import Gestures from './Gesture';
import ReporterUtil from './ReporterUtil';

export default class ElementUtil extends ReporterUtil {
	async waitForDisplayed(element: ChainablePromiseElement) {
		await element.waitForDisplayed({
			timeout: elementTimeout,
			timeoutMsg: `Element ${await element.selector} not found`,
			interval: 1000,
		});
	}

	async clickElementWithSwipeUp(element: ChainablePromiseElement) {
		await Gestures.checkIfDisplayedWithSwipeUp(element, 5);
		await element.click();
	}

	async clickElement(element: ChainablePromiseElement) {
		try {
			await element.click();
			this.log(`Clicked on element ${await element.selector}`);
		} catch (error) {
			this.log(`Element not found immediately, attempting swipe: ${error}`);
			const isDisplayed = await this.isElementDisplayedWithSwipe(element);
			if (isDisplayed) {
				await element.click();
				this.log(`Clicked on element ${await element.selector} after swiping`);
			} else {
				throw new Error(`Failed to click on element ${element} after swiping`);
			}
		}
	}

	async setElementValue(element: ChainablePromiseArray, value: string) {
		await this.waitForDisplayed(element);
		await element.setValue(value);
		this.log(`Entered value ${value} for element ${await element.selector}`);
		await this.hideKeyboardIfVisible();
	}

	async hideKeyboardIfVisible() {
		if (await driver.isKeyboardShown()) {
			this.log(`Hiding the keyboard`);
			if (driver.isAndroid) {
				await this.hideKeyboard();
			} else if (driver.isIOS) {
				await Gestures.touch({ x: 10, y: 300 });
			}
		}
	}

	async getElementText(element: ChainablePromiseElement) {
		await this.waitForDisplayed(element);
		return await $(element).getText();
	}

	async isElementDisplayedWithSwipe(
		element: ChainablePromiseElement,
		swipeAction = 'up'
	) {
		try {
			if (swipeAction.toLowerCase() === 'up') {
				await Gestures.checkIfDisplayedWithSwipeUp(element, 5);
			} else {
				await Gestures.checkIfDisplayedWithSwipeDown(element, 5);
			}
			return true;
		} catch (error) {
			this.log(`Element not found after swipe ${swipeAction}: ${error}`);
			return false;
		}
	}

	async hideKeyboard() {
		await driver.hideKeyboard();
	}

	async wait(time: number) {
		this.log(`Waiting for ${time} milliseconds`);
		await driver.pause(time);
	}
}
