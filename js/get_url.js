function get_url(elem)
{
	chrome.runtime.sendMessage('Hello', function(response)
	{
		elem.innerHTML = response;
	});
	setTimeout(function(){get_url(elem)}, 1000);
}

var idiv = document.getElementById('url_div');
get_url(idiv);
