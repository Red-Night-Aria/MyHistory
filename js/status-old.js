function update()
{
	chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab)
	{
		if (tab.status == "complete" && tab.url != "chrome://newtab/" && tab.url != now_url)
		{
			if (flag)
			{
				Id = String(tab.id);
				alert(now_url + "-->" + tab.url + "\n" + now_title + "-->" + tab.title);
				/*
				chrome.storage.sync.set({Id : tab.title}, function(){});
				chrome.storage.sync.get(Id, function(result)
				{
					alert(result);
				})
				*/
				flag = false;
			}
			//else alert(tab.title);
			now_title = tab.title;
			now_url = tab.url;
		}
	});
	
	chrome.tabs.onCreated.addListener(function(tab)
	{
		if (tab.url != "chrome://newtab/") flag = true;
		//alert("!!!!");
	});
	
	chrome.tabs.onActivated.addListener(function(activeInfo)
	{
		/*
		Id = String(activeInfo.tabId);
		now_title = chrome.storage.sync.get(Id, function(result)
		{
			now_title = result[Id];
			alert(result[Id]);
		});
		*/
	});

	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse)
	{
		sendResponse(now_url);
	});
}

var now_url = "about:blank", now_title = "Blank", flag = false, Id = null;
update();
