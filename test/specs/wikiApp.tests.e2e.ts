import WikiPage from '../pages/WikiPage';

describe('Wiki app tests', () => {
	it('verify all menu and go back to home and scroll to first topic', async () => {
		await WikiPage.verifyHomePageDisplayed();

		await WikiPage.openMyListPage();
		await WikiPage.wait(3000); // Its not needed but its mentioned in the task
		await WikiPage.verifyMyListPageDisplayed();

		await WikiPage.openHistoryPage();
		await WikiPage.wait(3000); // Its not needed but its mentioned in the task

		await WikiPage.verifyHistoryPageDisplayed();

		await WikiPage.openHomePage();
		await WikiPage.scrollToFirstTopic();
	});

	it('verify search', async () => {
		await WikiPage.openSearchPage();
		await WikiPage.verifySearchPageDisplayed();
		await WikiPage.search('New York');
		await WikiPage.verifySearchResults('New York City');
		await WikiPage.closeSearch();
		await WikiPage.verifyHomePageDisplayed();
	});

	it('toggle off all settings', async () => {
		await WikiPage.openSettingsPage();
		await WikiPage.verifySettingsPageDisplayed();
		await WikiPage.turnOFFAllSettings();
		await WikiPage.pressBackButton();
		await WikiPage.verifyHomePageDisplayed();
	});
});
