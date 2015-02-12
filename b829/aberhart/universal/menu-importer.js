"use strict"
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}
function getAreamenuLocation(parentFilePath) {
	var areamenuLocation;
	var parentFolder=parentFilePath.replace(
										/.*aberhart\//i,"").replace(/\/.*/i,"").trim(
										); // These weird newlines are here so that xcode doesn't screw up the indenting
	if (parentFolder=="universal") {
		areamenuLocation=getAreamenuLocation(getURLParameter("file"));
	}
	if (parentFolder=="index.htm") {
		areamenuLocation="main/areamenu-main.html";
	} else {
		areamenuLocation=parentFolder+"/areamenu-"+parentFolder+".html";
	}
	console.log("Setting: " + areamenuLocation);
	return ("/b829/aberhart/" + areamenuLocation);
}
$( document ).ready(function() {
	$("#topmenu-import").load( "/b829/aberhart/universal/topmenu.html" );
	$("#cbe-header").load( "/b829/aberhart/universal/cbe-header.html");
	$("#rightside").load( "/b829/aberhart/universal/rightside.html" );
	$("#footers").load( "/b829/aberhart/universal/footers.html" );
	$("#areamenu").load( getAreamenuLocation(location.href) );
});
