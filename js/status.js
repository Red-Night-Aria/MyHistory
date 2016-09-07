//var now_url = "about:blank", now_title = "Blank"/*, last_url = null, last_title = null*/;
function Mes(url, title) {
	this.url = url;
	this.title = title;
}

function update() {

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		/*console.log(tab.url + "  " + changeInfo.status);*/
		if (tab.status == "complete" && tab.url != "chrome://newtab/") {
			if (!TabMes[tab.id]) {
				console.log(now_url + "-->" + tab.url + "\n" + now_title + "-->" + tab.title);
				TabMes[tab.id] = new Mes(tab.url, tab.title);
			} else if (TabMes[tab.id].url!=tab.url){
				console.log(TabMes[tab.id].url + "-->" + tab.url + "\n" + TabMes[tab.id].title + "-->" + tab.title);
				TabMes[tab.id] = new Mes(tab.url, tab.title);
			}			
			/*
				alert(now_url + "-->" + tab.url + "\n" + now_title + "-->" + tab.title); /// add an edge from (now_url -> tab.url) in storage
			
				if (tab.highlighted == true) {
				//last_title = now_title;
				//last_url = now_url;
				now_title = tab.title;
				now_url = tab.url;
			}
			*/
		}
	});

	//在切换页面时更新当前标签页的信息
	chrome.tabs.onActivated.addListener(function (activeInfo) {
		Id = activeInfo.tabId;
		chrome.tabs.get(Id, function (tab) {
			if (tab.status=="complete"){
			now_title = tab.title;
			now_url = tab.url;
			}
		});
	});

}

var curPage=new Mes("about:blank","Blank"),TabMes = [];

update();
