// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
var rate=1;
function onClickHandler(info, tab) {
	
	var id=info.menuItemId;
	if(id=="setDefaultPlaybackRate")
		chrome.storage.sync.set({'defaultPlaybackRate': rate});
	else {
		rate=info.menuItemId.split("_")[1];
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {videoRate:rate });
		});
	}
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
	var title = "Adjust playback rate";
	
	var parent = chrome.contextMenus.create({"title": title,"contexts": ["video","browser_action"],"id": "videoHTML5"});
	chrome.contextMenus.create({"title": ".5","parentId":parent,"contexts": ["video","browser_action"],"id": "rate_.5"});
	chrome.contextMenus.create({"title": "1","parentId":parent,"contexts": ["video","browser_action"],		"id": "rate_1"	});
	chrome.contextMenus.create({"title": "1.5","parentId":parent,"contexts": ["video","browser_action"],"id": "rate_1.5"});
	chrome.contextMenus.create({"title": "2","parentId":parent,"contexts": ["video","browser_action"],"id": "rate_2"});
	
	var parent = chrome.contextMenus.create({"title": "Set default rate","contexts": ["browser_action"],"id": "setDefaultPlaybackRate"});
});


