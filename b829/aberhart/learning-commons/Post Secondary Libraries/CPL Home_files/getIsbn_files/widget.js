
function syn_get_widget(url) {
  var t = new Date();
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';

  // Attach handlers for all browsers
  var done = false;
  script.onload = script.onreadystatechange = function() {
    if( !done && ( !this.readyState 
                   || this.readyState == "loaded" 
                   || this.readyState == "complete") 
      ) {
      done = true;
      
      // Ensure jQuery doesn't conflict with the $ object of other JavaScript
      // libraries 
      jQuery.noConflict();

      // Now that jQuery has been loaded, load connector
      var js = document.createElement("script");
      js.src = "https://secure.syndetics.com/widget_connector.php?id=calgp&isbn=9780380978861&callback=cleanAll1350&t="+t.getTime();
      js.type = "text/javascript";
      head.appendChild(js);
 
      // Handle memory leak in IE
      script.onload = script.onreadystatechange = null;
      if ( head && script.parentNode ) { 
        head.removeChild( script ); 
      } 

    }
  };
  head.appendChild(script);
}

if(typeof(syn_loaded)=="undefined") {
  if(window.addEventListener) {
    window.addEventListener("load",syn_get_widget,false);
  }
  else if(window.attachEvent) {
    window.attachEvent("onload",syn_get_widget);
  }
}
var syn_loaded=1;
