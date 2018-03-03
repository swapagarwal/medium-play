chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'https://medium.com/' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function(array_of_tabs) {
    var tab = array_of_tabs[0];
    var url = tab.url;
    var id = url.split("-").pop();
    if (undefined !== id) {
      var request = new XMLHttpRequest();
      request.open("GET", "https://medium.com/p/" + id + "/notes", true);
      request.onload = function() {
        if (request.status === 200) {
          var resp = request.responseText;
          var match = resp.match(/\"audioVersionUrl\":\"([^"]+)\"/);
          if (null !== match && null !== match[1]) {
            var audioUrl = match[1];
            chrome.tabs.create({"url": audioUrl});
          }
        }
      };
      request.send();
    }
  });
});
