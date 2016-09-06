function update()
{
	chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab)
	{
		if (tab.status == "complete" && tab.url != "chrome://newtab/")
		{
			if (flag)
			{
				if (now_url != tab.url)	alert(now_url + "-->" + tab.url + "\n" + now_title + "-->" + tab.title);
				if (now_url == tab.url)	alert(last_url + "-->" + tab.url + "\n" + last_title + "-->" + tab.title);
				flag = false;
			}
			last_title = now_title;
			last_url = now_url;
			now_title = tab.title;
			now_url = tab.url;
		}
	});
	
	chrome.tabs.onCreated.addListener(function(tab)
	{
		if (tab.url != "chrome://newtab/") flag = true;
	});
	
	chrome.tabs.onActivated.addListener(function(activeInfo)
	{
		Id = activeInfo.tabId;
		chrome.tabs.get(Id, function(tab)
		{
			if (last_url != now_url)
			{
				last_title = now_title;
				last_url = now_url;
				now_title = tab.title;
				now_url = tab.url;
			}
		});
	});

	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse)
	{
		sendResponse(now_url);
	});
}

var now_url = "about:blank", now_title = "Blank", last_url = null, last_title = null, flag = false, Id = null;
update();
