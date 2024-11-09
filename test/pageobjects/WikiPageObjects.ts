class WikiPageObjects {
	home = {
		get pageTitle() {
			return $(
				'//android.widget.ImageView[@resource-id="org.wikipedia.alpha:id/single_fragment_toolbar_wordmark"]'
			);
		},

		get exploreMenu() {
			return $('//android.widget.FrameLayout[@content-desc="Explore"]');
		},

		get firstTopic() {
			return $(
				'//android.widget.TextView[@resource-id="org.wikipedia.alpha:id/view_card_header_title" and @text="In the news"]'
			);
		},
	};

	search = {
		get searchButton() {
			return $(
				'//android.view.View[@resource-id="org.wikipedia.alpha:id/fragment_feed_header"]'
			);
		},

		get searchInput() {
			return $(
				'//android.widget.AutoCompleteTextView[@resource-id="org.wikipedia.alpha:id/search_src_text"]'
			);
		},

		get closeButton() {
			return $('//android.widget.ImageView[@content-desc="Clear query"]');
		},

		searchResult(resultText: string) {
			return $(
				`//android.widget.TextView[@resource-id="org.wikipedia.alpha:id/page_list_item_title" and @text="${resultText}"]`
			);
		},
	};

	myList = {
		get myListMenu() {
			return $('//android.widget.FrameLayout[@content-desc="My lists"]');
		},

		get pageTitle() {
			return $(
				'//android.view.ViewGroup[@resource-id="org.wikipedia.alpha:id/single_fragment_toolbar"]/android.widget.TextView[@text="My lists"]'
			);
		},
	};

	history = {
		get historyMenu() {
			return $('//android.widget.FrameLayout[@content-desc="History"]');
		},

		get pageTitle() {
			return $(
				'//android.view.ViewGroup[@resource-id="org.wikipedia.alpha:id/single_fragment_toolbar"]/android.widget.TextView[@text="History"]'
			);
		},
	};

	settings = {
		get moreOptionsButton() {
			return $('//android.widget.TextView[@content-desc="More options"]');
		},

		get settingsButton() {
			return $(
				'//android.widget.TextView[@resource-id="org.wikipedia.alpha:id/explore_overflow_settings"]'
			);
		},

		get toggleButtons() {
			return $$(
				`//android.widget.Switch[@resource-id="org.wikipedia.alpha:id/switchWidget"]`
			);
		},

		get backButton() {
			return $('//android.widget.ImageButton[@content-desc="Navigate up"]');
		},

		get pageTitle() {
			return $('//android.widget.TextView[@text="Settings"]');
		},
	};
}
export default new WikiPageObjects();
