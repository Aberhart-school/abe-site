jQuery.fn.headerFeature = function (options) {
    //the curent obj;
    var element = this;
    //set up the following arrays to hold xml date
    var ImageName = new Array();
    var Title = new Array();
    var Comments = new Array();
    var LinkTo = new Array();

    //set up the default options
    var defaults = {
        xmlFile: '',
        width: "505",
        height: "140",
        fadeDuration: "1000",
        duration: "7000",
        imagePath: "gallery/",
        appImagePath: "images/"
    };
    // Extend our default options with those provided.
    var settings = $.extend(defaults, options);
    // lets size div accordingly options
    $(element).css('width', settings.width);
    $(element).height(settings.height);
    // lets place the need elements on page
    setupElements();
    //now lets position them based on screen size
    //postionElements();

    function setupElements() {
        //add text
        $('body').append('<div id="hf-text-wrapper"></div>');
        //add controls
        $("body").append("<div id='fh-control'>&nbsp;</div>");
		$('#fh-control').append('<img id="fh-prev" src="' + settings.appImagePath + 'hf-prev.jpg"><img class="play" id="fh-playpause" src="' + settings.appImagePath + 'hf-pause.jpg"><img id="fh-next" src="' + settings.appImagePath + 'hf-next.jpg">');
        //add title
        $('#hf-text-wrapper').append('<div id="hf-title"></div>');
        //add body
        $('#hf-text-wrapper').append('<div id="hf-body"></div>');
        //add link
        $('#hf-text-wrapper').append('<div id="hf-link"></div>');
    }
	
		
    function positionElements() {
       
        //get window offset
        var o = $(element).offset();
		var p = $('#topCurve').offset(); 		
		
        //postion text on image
        $('#hf-text-wrapper').css({
            'position': 'absolute',
            'left':o.left + 310,
            'top': parseInt(p.top) + 47,
			//'margin':'10px',	
			'width':'160px'
        });
        
		//postion controls
        $('#fh-control').css({
            'position': 'absolute',
            'left': parseInt(o.left) + 15,
            'top': parseInt(p.top) + 135
        });
        
        //postion images
        $(".fadein img").css({
            'position': 'absolute',
            'left': parseInt(o.top) / parseInt(o.top),
            'top': parseInt(o.top) / parseInt(o.top)
        }); 
		
    }
    //this events fires off everytime the window is resize to postion the elemnts again
    $(window).resize(function () {
    	positionElements();
		
    });
    // fires of the ajax event to get the xml
    $.ajax({
        type: "POST",
        url: settings.xmlFile,
        dataType: "xml",
        success: function (xmlData) {
            parseXml(xmlData);

        },
        beforeSend: function () {
            showLoading();
        },
        complete: function () {
            removeLoading();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $(element).append("<div id='hf-message' style='color:red'>Error: loading XML file " + textStatus + "</div>");
        }
    });

    function removeLoading() {
        $('#hf-message').remove();
    }

    function showLoading() {
        $(element).append("<div id='hf-message'>loading images......</div>");
    }

    function outPut(images) {
        var imgLenght = images.length;
       debug(imgLenght);
        for (var i = 0; i < imgLenght; i++) {
            $(element).append("<img id='image-" + i + "' src='" + settings.imagePath + images[i] + "' />\n");
        }
        $(element).addClass('fadein');
        $('.fadein img:gt(0)').hide();
        $(function () {
            $('.fadein img:gt(0)').hide();
            setInterval(function () {
                if ($('#fh-playpause').attr('class') != 'pause') {
                    $('.fadein :first-child').fadeOut(settings.fadeDuration).next('img').fadeIn(settings.fadeDuration).end().appendTo('.fadein');
                    addText();
                }
            }, settings.duration);
        });
        //
        positionElements();
    }
/*
	 * play/stop controls
	 */
    $("#fh-playpause").live('click', function () {
        //is it already paused ?
        if ($(this).attr('class') == 'pause') {
            $(this).attr('src', settings.appImagePath + 'hf-pause.jpg');
            // if not lets pause
            $(this).removeClass('pause');
            $(this).addClass('play');
        } else {
            $(this).attr('src', settings.appImagePath + '/hf-play.jpg');
            //else we most be on pause
            $(this).removeClass('play');
            $(this).addClass('pause');
        }
    });
/*
	 * place text and links
	 */

    function addText() {
        imageID = $('.fadein :first-child').attr("id");
        ID = imageID.split("-");
        $("#hf-body").html(Comments[ID[1]])
        $("#hf-title").html(Title[ID[1]])
        $("#hf-link").html(LinkTo[ID[1]])
    }
/*
	 * prev controls
	 */
    $("#fh-prev").live('click', function () {
        $('.fadein :first-child').fadeOut(settings.fadeDuration);
        $('.fadein :last-child').prependTo('.fadein').fadeIn(
        settings.fadeDuration);
        addText();
    });
/*
	 * next controls
	 */
    $("#fh-next").live('click', function () {
        $('.fadein :first-child').fadeOut(settings.fadeDuration).next('img').fadeIn(settings.fadeDuration).end().appendTo('.fadein');
        addText();
    });
    /*
	 * this will parse the xml file from the server
	 *
	 */
    function parseXml(xmlData) {
    	var searchNode = "\\[nodeName=wcm\\:row\\]";
    	$(xmlData).find(searchNode).each(function () {
    		switch ($(this).attr('name')) {
            case "ImageName":
                start = $(this).text().indexOf(",'") + 2;
                end = $(this).text().lastIndexOf("'");
                image = $(this).text().slice(start, end) + ".jpg";
                ImageName.push(image);
                break;
            case "Title":
                Title.push($(this).text());
                break;
            case "Comments":
                Comments.push($(this).text());
                break;
             case "LinkTo":
                slideLink = $(this).text();
                slideLink = slideLink.replace('[!--$ssServerRelativeSiteRoot--]',settings.serverPath);
                LinkTo.push(slideLink);

				break;
            }
			  //debug(LinkTo);
        });
        //add the first slide stuff
    	$("#hf-body").html(Comments[0])
        $("#hf-title").html(Title[0])
        $("#hf-link").html(LinkTo[0])
        outPut(ImageName);
    }
};

function debug(obj) {
    if (window.console && window.console.log) window.console.log(obj);
}
