chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message == "medium-play") {
			var text = document.body.textContent;
			var match = text.match(/\"audioVersionUrl\":\"([^"]+)\"/);
			if (null !== match && null !== match[1]) {
				var audioPlayer = document.getElementsByClassName("elevateAudioPlayer");
				audioPlayer[0].innerHTML = '<audio preload="auto" controls="controls" src=' + match[1] + '></audio>'; 
			}
    	}
});
