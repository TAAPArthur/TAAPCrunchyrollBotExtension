chrome.browserAction.onClicked.addListener(
	function(tab) {
		chrome.tabs.executeScript({
			code: 'document.location.href="http://crunchyroll.com";'
		});
	});
/*
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, {
		file: "gotoCrunchyroll.js"
	});
});
*/


