/* 
********************************************************************* 
Original Javascript from Government of Alberta site used under the following provisions:
http://www.gov.ab.ca/home/index.cfm?page=437

Last Modified April 20, 2004
john.rauchert@sait.ca
Centre for Instructional Technology and Development
*********************************************************************
*/

// Global variable declarations
var breadcrumbSeparator = "/";	
var chrDelimiter = "||";		// Delimiter string
var cookiePath = "/";		// Cookie path to store
var cookieExpiration = 0;	// Cookie expiration (in hours)

// Create a dummy Cookie object to make the functions above into methods
new Cookie();
Cookie.prototype.store = _Cookie_store;
Cookie.prototype.load = _Cookie_load;
Cookie.prototype.remove = _Cookie_remove;

function MakeCookie(name, title, href)
{
	var the_cookie = "";
	
	the_cookie = title + chrDelimiter + href;

	var our_cookie;
	our_cookie = new Cookie(document, name, cookieExpiration, cookiePath);
	our_cookie.load();
	our_cookie.info = the_cookie;
	our_cookie.store();
}

function SetCookie(name, cookie_info, new_title, new_href)
{
	var the_cookie = "";
	
	the_cookie = cookie_info + new_title + chrDelimiter + new_href;
	
	var our_cookie;
	our_cookie = new Cookie(document, name, cookieExpiration, cookiePath);
	our_cookie.load();
	our_cookie.info = the_cookie;
	our_cookie.store();
}

function KillCookie(name)
{
	var our_cookie;
	our_cookie = new Cookie(document, name, cookieExpiration, cookiePath);
	our_cookie.remove();
}

function ReadCookie(name)
{
	var info;
	var our_cookie;
	our_cookie = new Cookie(document, name, cookieExpiration, cookiePath);
	our_cookie.load();
	
	info = our_cookie.info;
	
	// Check cookie information contains null, if so, provide blank string
	if (!info)
	{
		info = "";
	}

	return info;
}

function SplitCookieInfo(the_info)
{
	// Split cookie information based on delimiter
	var split_info = the_info.split(chrDelimiter);
	
	return split_info;
}

function LoadBreadCrumb()
{
	var crumb = "BreadCrumb";
	var Crumb_Trail = "";
	var New_Crumb_Trail = "";
	var title = document.title;
	var subSection = title.substring(10);
	var href = document.location.href;
	var Cookie_Information = new Array();

	Cookie_Information = ReadCookie(crumb);

	// Check page is actual home page and view the breadcrumb
	//if (title == "Home Page")
	if (subSection == "Home Page")
	{
		KillCookie(crumb);

	}
	// If cookie contains nothing, make cookie using current page information and view it
	else if (Cookie_Information == "")
	{
		MakeCookie(crumb, subSection, href);
		Cookie_Information = SplitCookieInfo(ReadCookie(crumb));
		
		for (var i = 0; i < Cookie_Information.length; i = i + 2)
		{
			Crumb_Trail+= " " + breadcrumbSeparator + " " + "<a class='breadcrumb' href=" + Cookie_Information[i+1] + ">" + Cookie_Information[i] + "</a>";
		}
	}
	// Else append current page information to cookie and view it
	else
	{
		var Found = false;
		Cookie_Information = SplitCookieInfo(ReadCookie(crumb));
		
		// Loop through existing cookie values and stop if current page found
		for (var i = 0; i < Cookie_Information.length; i = i + 2)
		{
			if (Found == false)
			{
				if (Cookie_Information[i+1].toLowerCase() == href.toLowerCase())
				{
					Found = true;
				}
				else
				{
					//Build the new trail
					New_Crumb_Trail+=  Cookie_Information[i] + chrDelimiter + Cookie_Information[i+1] + chrDelimiter;
				}
			}
		}
		
		// After searching old trail, delete existing cookie and create new one
		KillCookie(crumb);
		
		
		SetCookie(crumb, New_Crumb_Trail, subSection, href);
		
		
		/*
			Read back newly created cookie to display the bread crumb trail:
			(To display only 4 links in trail, start reading the array four links
			from the end).
		*/
		
		Cookie_Information = SplitCookieInfo(ReadCookie(crumb));
		
		// More than two links
		if (Cookie_Information.length > 4)
		{
			for (var i = Cookie_Information.length-4; i < Cookie_Information.length; i = i + 2)
			{
				// Avoid printing the delimiting character at end breadcrumb
				if (i == Cookie_Information.length - 2)
				{
					Crumb_Trail+= "<a class='breadcrumb' href=" + Cookie_Information[i+1] + ">" + Cookie_Information[i] + "</a>";
				}	
				else
				{
					Crumb_Trail+= "<a class='breadcrumb' href=" + Cookie_Information[i+1] + ">" + Cookie_Information[i] + "</a>" + " " + breadcrumbSeparator + " ";
				}
			}	
		}
		else
		{
			for (var i = 0; i < Cookie_Information.length; i = i + 2)
			{
				if (i == Cookie_Information.length - 2)
				{						
					Crumb_Trail+= "<a class='breadcrumb' href=" + Cookie_Information[i+1] + ">" + Cookie_Information[i] + "</a>";
				}
				else
				{						
					Crumb_Trail+= "<a class='breadcrumb' href=" + Cookie_Information[i+1] + ">" + Cookie_Information[i] + "</a>" + " " + breadcrumbSeparator + " ";	
				}
			}
		}
		
		// Account for the hard coded links
		Crumb_Trail = " " + breadcrumbSeparator + " " + Crumb_Trail
	}
	
	return Crumb_Trail;	
}

//Begin modular cookie class code 
function Cookie(doc, name, hours, path, domain, secure)
{
	this._document = doc;
	this._name = name;
	if (hours)
	{
		this._expiration = new Date((new Date()).getTime() + hours*3600000);
	}
	else
	{
		this._expiration = null;
	}
	if (path)
	{
		this._path = path;
	}
	else
	{
		this._path = null;
	}
	if (domain)
	{
		this._domain = domain;
	}
	else
	{
		this._domain = null;
	}
	if (secure)
	{
		this._secure = true;
	}
	else
	{
		this._secure = false;
	}
}

// This function stores the cookie object
function _Cookie_store()
{
	var cookieval = "";
	for (var prop in this)
	{
		// Ignore properties with names that begin with '_' and also methods
		if ((prop.charAt(0) == '_') || ((typeof this[prop]) == 'function'))
		{
			continue;
		}
		if (cookieval != "")
		{
			cookieval += '&';
		}
		cookieval += prop + '::' + escape(this[prop]);
	}

	var cookie = this._name + '=' + cookieval;

	if (this._expiration)
	{
		cookie += '; expires=' + this._expiration.toGMTString();
	}
	if (this._path)
	{
		cookie += '; path=' + this._path;
	}
	if (this._domain)
	{
		cookie += '; domain=' + this._domain;
	}
	if (this._secure)
	{
		cookie += '; secure';
	}
	
	// Store cookie by setting the document.cookie property
	this._document.cookie = cookie;
}

// Function load cookie object
function _Cookie_load()
{
	var allcookies = this._document.cookie;
	if (allcookies == "")
	{
		return false;
	}
	
	// Extract named cookie from list
	var start = allcookies.indexOf(this._name + '=');
	if (start == -1)
	{
		return false;   // If cookie not defined for this page
	}
	start += this._name.length + 1;  // Skip name and equals sign.
	var end = allcookies.indexOf(';', start);
	if (end == -1)
	{
		end = allcookies.length;
	}
	var cookieval = allcookies.substring(start, end);
	
	var a = cookieval.split('&');  // Break cookie into array of name/value pairs
	for (var i=0; i < a.length; i++)  // Break each name/value pair into an array
	{
		if (a[i].indexOf('%3A%3A') >= 0)
		{
			a[i] = a[i].split('%3A%3A');
		}
		else
		{
			a[i] = a[i].split('::');
		}
	}
		
	for (var i = 0; i < a.length; i++)
	{
		this[a[i][0]] = unescape(a[i][1]);
	}
	
	// Return success
	return true;
}

// Function to remove cookie object
function _Cookie_remove()
{
	var cookie;
	cookie = this._name + '=';
	if (this._path)
	{
		cookie += '; path=' + this._path;
	}
	if (this._domain)
	{
		cookie += '; domain=' + this._domain;
	}
	cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
	
	this._document.cookie = cookie;
}


// ********************************************************************* 
// End of modular cookie class code 
// *********************************************************************