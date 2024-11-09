import ElementUtil from '../utility/ElementUtil';
import WikiPageObjects from '../pageobjects/WikiPageObjects';

class WikiPage extends ElementUtil {
	async openHomePage() {
		this.logStep('Open Home Page');
		await this.clickElement(WikiPageObjects.home.exploreMenu);
	}

	async verifyHomePageDisplayed() {
		this.logStep('Verify Home Page is displayed');
		await this.waitForDisplayed(WikiPageObjects.home.pageTitle);
	}

	async openMyListPage() {
		this.logStep('Open My List Page');
		await this.clickElement(WikiPageObjects.myList.myListMenu);
	}

	async verifyMyListPageDisplayed() {
		this.logStep('Verify My List Page is displayed');
		await this.waitForDisplayed(WikiPageObjects.myList.pageTitle);
	}

	async openHistoryPage() {
		this.logStep('Open History Page');
		await this.clickElement(WikiPageObjects.history.historyMenu);
	}

	async verifyHistoryPageDisplayed() {
		this.logStep('Verify History Page is displayed');
		await this.waitForDisplayed(WikiPageObjects.history.pageTitle);
	}

	async openSettingsPage() {
		this.logStep('Open Settings Page');
		await this.clickElement(WikiPageObjects.settings.moreOptionsButton);
		await this.clickElement(WikiPageObjects.settings.settingsButton);
	}

	async verifySettingsPageDisplayed() {
		this.logStep('Verify Settings Page is displayed');
		await this.waitForDisplayed(WikiPageObjects.settings.pageTitle);
	}

	async openSearchPage() {
		this.logStep('Open Search Page');
		await this.clickElement(WikiPageObjects.search.searchButton);
	}

	async verifySearchPageDisplayed() {
		this.logStep('Verify Search Page is displayed');
		await this.waitForDisplayed(WikiPageObjects.search.searchInput);
	}

	async scrollToFirstTopic() {
		this.logStep('Go to first topic');
		await this.isElementDisplayedWithSwipe(WikiPageObjects.home.firstTopic);
	}

	async search(searchText: string) {
		this.logStep(`Search for ${searchText}`);
		await this.setElementValue(WikiPageObjects.search.searchInput, searchText);
	}

	async verifySearchResults(resultText: string) {
		this.logStep(`Verify search results for ${resultText}`);
		await this.waitForDisplayed(
			WikiPageObjects.search.searchResult(resultText)
		);
	}
	async closeSearch() {
		this.logStep('Close Search');
		await this.clickElement(WikiPageObjects.search.closeButton);
		await this.wait(1000);
		await this.clickElement(WikiPageObjects.search.closeButton);
	}

	async turnOFFAllSettings() {
		this.logStep('Turn OFF all settings');
		let buttons = await WikiPageObjects.settings.toggleButtons.length;

		for (let i = 0; i < buttons; i++) {
			await this.clickElement(WikiPageObjects.settings.toggleButtons[i]);
		}
	}

	async pressBackButton() {
		this.logStep('Press Back Button');
		await this.clickElement(WikiPageObjects.settings.backButton);
	}
}
export default new WikiPage();
