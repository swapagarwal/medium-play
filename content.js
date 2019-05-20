chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message == "medium-play") {
			var text = document.body.textContent;
			var match = text.match(/\"audioVersionUrl\":\"([^"]+)\"/);
			if (null !== match && null !== match[1]) {
				var audio = new Audio(match[1]);
				//audio.play();
					
				var x = document.getElementsByClassName("elevateAudioPlayer");
				x[0].innerHTML = '<audio preload="auto" controls="controls" src=' + match[1] + '></audio>'; 
			}
    	}
});