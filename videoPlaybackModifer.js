console.log("added");
var videoElement;
document.addEventListener("mousedown", function(event) {
	//right click
	if (event.button == 2) {
		console.log(event.target);
		videoElement = event.target;
	}
}, true);


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.videoRate)
			setPlaybackRate(rate);
		videoElement = null;
	});

function setPlaybackRate(rate) {
	if (request.videoRate)
		if (videoElement) {
			videoElement.playbackRate = rate;
			console.log("setting playbackrate to " + rate);
			console.log(videoElement);
		} else {
			var videos = document.getElementsByTagName("video");
			for (var i = 0; i < videos.length; i++)
				videos[i].playbackRate = rate;
		}
}
chrome.storage.sync.get('defaultPlaybackRate',function(item){setPlaybackRate["rate"]});