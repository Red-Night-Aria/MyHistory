//var now_url = "about:blank", now_title = "Blank"/*, last_url = null, last_title = null*/;
function Mes(url, title) {
	this.url = url;
	this.title = title;
}

function update() {
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		/*console.log(tab.url + "  " + changeInfo.status);*/
		if (tab.status == "loading" && tab.url != "chrome://newtab/") {
			if (!TabMes[tab.id]) {
				console.log(curPage.url + "-->" + tab.url + "\n" + curPage.title + "-->" + tab.title);
				TabMes[tab.id] = new Mes(tab.url, tab.title);
			} else if (TabMes[tab.id].url!=tab.url){
				console.log(TabMes[tab.id].url + "-->" + tab.url + "\n" + TabMes[tab.id].title + "-->" + tab.title);
				TabMes[tab.id] = new Mes(tab.url, tab.title);
			}			
			flag=false;
			chrome.tabs.query({'active': true, 'currentWindow': true},function(tabs){
				curPage={url : tabs[0].url, title : tabs[0].title};
			})
		}
	});

	//在新标签页打开网页时打上标记，以免随后的onActived事件改变curPage
	chrome.tabs.onCreated.addListener(function(tab){
		if (tab.url!="chrome://newtab/") flag=true;
	});

	//在切换页面时更新当前标签页的信息
	chrome.tabs.onActivated.addListener(function (activeInfo) {
		Id = activeInfo.tabId;
		chrome.tabs.get(Id, function (tab) {
			if (!flag){
				curPage.title=tab.title;
				curPage.url=tab.url;
			}
		});
	});

}

var curPage=new Mes("about:blank","Blank"),TabMes = [];
var flag=false;	//当前网页是否为正在载入的
update();
