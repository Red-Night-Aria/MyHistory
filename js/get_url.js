var idiv = document.getElementById('url_div');
var curTab;
chrome.tabs.query({'highlighted': true, 'currentWindow': true}, function(tabs)
{
	curTab = tabs[0];
	idiv.innerHTML = curTab.url;
});

