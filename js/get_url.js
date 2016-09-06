var idiv = document.getElementById('url_div');
var curTab
//var selTabs;
chrome.tabs.query({'highlighted': true, 'currentWindow': true}, function(tabs){
	//selTabs=tabs;
	curTab=tabs[0];
	idiv.innerHTML=curTab.url;
});

