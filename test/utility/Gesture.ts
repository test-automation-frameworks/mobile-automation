import { RectReturn } from '@wdio/protocols/build/types';

let SCREEN_SIZE: RectReturn;
interface XY {
	x: number;
	y: number;
}

/**
 * The values in the below object are percentages of the screen
 */
const SWIPE_DIRECTION = {
	down: {
		start: { x: 50, y: 15 },
		end: { x: 50, y: 85 },
	},
	left: {
		start: { x: 95, y: 50 },
		end: { x: 5, y: 50 },
	},
	right: {
		start: { x: 5, y: 50 },
		end: { x: 95, y: 50 },
	},
	up: {
		start: { x: 50, y: 85 },
		end: { x: 50, y: 15 },
	},
};

class Gestures {
	static async checkIfDisplayedWithSwipeUp(
		element: ChainablePromiseElement,
		maxScrolls: number,
		amount = 0
	) {
		if (!(await element.isDisplayed()) && amount <= maxScrolls) {
			await this.swipeUp(0.85);
			await this.checkIfDisplayedWithSwipeUp(element, maxScrolls, amount + 1);
		} else if (amount > maxScrolls) {
			throw new Error(
				`The element '${element}' could not be found or is not visible.`
			);
		}
	}

	static async checkIfDisplayedWithSwipeDown(
		element: ChainablePromiseElement,
		maxScrolls: number,
		amount = 0
	) {
		if (!(await element.isDisplayed()) && amount <= maxScrolls) {
			await this.swipeDown(0.5);
			await this.checkIfDisplayedWithSwipeDown(element, maxScrolls, amount + 1);
		} else if (amount > maxScrolls) {
			throw new Error(
				`The element '${element}' could not be found or is not visible.`
			);
		}
	}

	static async longPress(element: WebdriverIO.Element) {
		await driver.touchAction([
			{
				action: 'longPress',
				element: element,
			},
		]);
	}

	/**
	 * Swipe down based on a percentage
	 */
	static async swipeDown(percentage = 1) {
		await this.swipeOnPercentage(
			this.calculateXY(SWIPE_DIRECTION.down.start, percentage),
			this.calculateXY(SWIPE_DIRECTION.down.end, percentage)
		);
	}

	/**
	 * Swipe Up based on a percentage
	 */
	static async swipeUp(percentage = 1) {
		await this.swipeOnPercentage(
			this.calculateXY(SWIPE_DIRECTION.up.start, percentage),
			this.calculateXY(SWIPE_DIRECTION.up.end, percentage)
		);
	}

	/**
	 * Swipe left based on a percentage
	 */
	static async swipeLeft(percentage = 1) {
		await this.swipeOnPercentage(
			this.calculateXY(SWIPE_DIRECTION.left.start, percentage),
			this.calculateXY(SWIPE_DIRECTION.left.end, percentage)
		);
	}

	/**
	 * Swipe right based on a percentage
	 */
	static async swipeRight(percentage = 1) {
		await this.swipeOnPercentage(
			this.calculateXY(SWIPE_DIRECTION.right.start, percentage),
			this.calculateXY(SWIPE_DIRECTION.right.end, percentage)
		);
	}

	static async swipeOnPercentage(from: XY, to: XY) {
		SCREEN_SIZE = SCREEN_SIZE || (await driver.getWindowRect());
		// Get the start position on the screen for the swipe
		const pressOptions = this.getDeviceScreenCoordinates(SCREEN_SIZE, from);
		// Get the move to position on the screen for the swipe
		const moveToScreenCoordinates = this.getDeviceScreenCoordinates(
			SCREEN_SIZE,
			to
		);

		await this.swipe(pressOptions, moveToScreenCoordinates);
	}

	/**
	 * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
	 */
	static async swipe(from: XY, to: XY) {
		await driver
			.action('pointer')
			.move({ x: from.x, y: from.y })
			.down()
			.move({ x: to.x, y: to.y, duration: 1000 }) // Adjusted duration for faster swipes
			.up()
			.perform();

		// Add a pause, just to make sure the swipe is done
		await driver.pause(1000);
	}

	private static getDeviceScreenCoordinates(
		screenSize: RectReturn,
		coordinates: XY
	): XY {
		return {
			x: Math.round(screenSize.width * (coordinates.x / 100)),
			y: Math.round(screenSize.height * (coordinates.y / 100)),
		};
	}

	private static calculateXY({ x, y }: XY, percentage: number): XY {
		return {
			x: x * percentage,
			y: y * percentage,
		};
	}

	static async scrollToBottom(repeat: number = 1) {
		const { width, height } = await browser.getWindowRect();

		// Calculate the coordinates for scrolling
		const startX = Math.floor(width / 2);
		const startY = Math.floor(height * 0.8);
		const endX = Math.floor(width / 2);
		const endY = Math.floor(height * 0.2);

		// Perform the scroll action
		for (let i = 0; i < repeat; i++) {
			await this.swipe({ x: startX, y: startY }, { x: endX, y: endY });
		}
	}

	static async scrollToUp(repeat: number = 1) {
		const { width, height } = await browser.getWindowRect();

		// Calculate the coordinates for scrolling
		const startX = Math.floor(width / 2);
		const startY = Math.floor(height * 0.2);
		const endX = Math.floor(width / 2);
		const endY = Math.floor(height * 0.8);

		// Perform the scroll action
		for (let i = 0; i < repeat; i++) {
			await this.swipe({ x: startX, y: startY }, { x: endX, y: endY });
		}
	}

	static async touch({ x, y }: { x: number; y: number }) {
		await browser.performActions([
			{
				type: 'pointer',
				id: 'finger1',
				parameters: { pointerType: 'touch' },
				actions: [
					{ type: 'pointerMove', duration: 0, x: x, y: y }, // Move to coordinates (x, y)
					{ type: 'pointerDown', button: 0 }, // Press down (tap)
					{ type: 'pointerUp', button: 0 }, // Release the tap
				],
			},
		]);

		// After the actions are performed, you must release the actions.
		await browser.releaseActions();
	}
}

export default Gestures;
