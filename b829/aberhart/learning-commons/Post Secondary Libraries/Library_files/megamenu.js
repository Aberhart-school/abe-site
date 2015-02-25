(function ($) {
    $(document).ready(function() {
        var timeout			= Drupal.settings.megamenu.timeout;
        var sizewait		=  Drupal.settings.megamenu.sizewait;
        var hoverwait		=  Drupal.settings.megamenu.hoverwait;
        var hovertimer		= null;
        var sizetimer		= null;
        var closetimer		= null;
        var hoverParent		= null;
        var hoverBin		= null;
        var hoverSlots		= null;
        var megaSlots		= null;
        var megaParents		= null;
        var hideOffset		= -9000;
        var megaParents = $('.megamenu-menu').find('.megamenu-parent');
        var megaParentTitles = $('.megamenu-menu').find('.megamenu-parent-title');
        var megaBins = $('.megamenu-menu').find('.megamenu-bin');
        var oldParentIdx = -1;
        var hoverParentIdx = -2;
        megaBins.css('top', hideOffset);
        var activeParent	 		= megaParents.index($(megaParents).has('.active'));
        if(activeParent != -1)
        {
            megaParents.eq(activeParent).addClass('active');
        }

        function megamenu_open(){
            megamenu_canceltimer();

            if ($(this).hasClass('megamenu-parent-title')) {
                hoverParentIdx = megaParentTitles.index($(this));
            }
            else if ($(this).hasClass('megamenu-bin')) {
                hoverParentIdx = megaParents.index($(this).parents('.megamenu-parent'));
            }

            hoverParent = megaParents.eq(hoverParentIdx);

            if (hoverParentIdx != oldParentIdx) {
                megamenu_close();
                megamenu_hovertimer();
            } else {
                megamenu_display();
            }
        }

        function megamenu_display() {
            if (hoverParent) {
                // If the display doesn't have hover yet - trigger event
                if (!hoverParent.hasClass('hovering')) {
                    hoverParent.trigger('megamenu_open');
                }
                hoverParent.addClass('hovering');
                hoverBin = hoverParent.find('.megamenu-bin');
                /* display position */
                hoverBin.css('top', 'auto');
            /* display position end */
            }
        }

        function megamenu_close(){
            if (hoverParent) {
                oldParentIdx = $('.megamenu-parent').index(hoverParent);
            }
            for ( var i=0 ; i < megaParents.length ; i++ ) {
                megaParents.trigger('megamenu_close');
                megaParents.eq(i).removeClass('hovering');
            }
            if(hoverBin) hoverBin.css('top', hideOffset);
        }

        function megamenu_closeAll(){
            if(hoverBin) hoverBin.css('top', hideOffset);
            for ( var i=0 ; i < megaParents.length ; i++ ) {
                megaParents.trigger('megamenu_close');
                megaParents.eq(i).removeClass('hovering');
            }
            oldParentIdx = -1;
        }

        function megamenu_stopPropagation(event){
            event.stopPropagation();
        }

        function megamenu_timer(){
            megamenu_canceltimer();
            megamenu_cancelhovertimer();
            closetimer = window.setTimeout(megamenu_closeAll, timeout);
        }

        function megamenu_canceltimer(){
            if (closetimer) {
                window.clearTimeout(closetimer);
                closetimer = null;
            }
        }

        function megamenu_hovertimer(){
            megamenu_cancelhovertimer();
            hovertimer = window.setTimeout(megamenu_display, hoverwait);
        }

        function megamenu_cancelhovertimer(){
            if (hovertimer) {
                window.clearTimeout(hovertimer);
                hovertimer = null;
            }
        }

        function megamenu_sizetimer(){
            /* waits to resize on initial call to accomodate browser draw */
            sizetimer = window.setTimeout(megamenu_sizer, sizewait);
        }

        function megamenu_sizer(){
            $pageWidth = $('.uc-980').width();
            //$pageWidth = $('#page-wrapper').width();
            $columnRemoved = 2;
            //alert('$pageWidth ' + $pageWidth);
            //alert('megaBins.length' + megaBins.length);
            for ( var k = 0 ; k < megaBins.length ; k++ ) {
                /*
                 * resets to bin sizes and position before sizing
                 * Description: Set one or more CSS properties for the set of matched elements.
                 */
                megaBins.eq(k).css('left', 0 + 'px');
                megaBins.eq(k).css('width', 0 + 'px');
                // get the elements have class .megamenu-slot
                var megaSlots = megaBins.eq(k).find('.megamenu-slot');
                /*
                 * auto bin width start
                 */
                var i = 0;
                // if each of this element has class
                if (megaBins.eq(k).hasClass('megamenu-slots-columnar')) {
                    //
                    var slotTotalWidth = 20;
                    // looping thru number of slot element which is <li>
                    for ( i = 0 ; i < megaSlots.length ; i++ ) {
                        //alert('the break loop back without warning?');
                        // calculate the total width of all slots
                        slotTotalWidth += megaSlots.eq(i).outerWidth(true);
                        // $pageWidth is to relatively calculate the width size of the page instead of full window size
                        // if the total width fo all slots greater than the page width
                        // if (slotTotalWidth > $pageWidth) {
                        // To gurantee not to go over pageWidth but wrap arround
                        if (slotTotalWidth > $pageWidth) {
                            //alert('Go over pageWidth' + slotTotalWidth + ' > ' + $pageWidth);
                            // reset total width of all slots
                            slotTotalWidth = 0;
                            // total width of all slots now RECALCULATED. this gurantee the max width of page to be used
                            for (var j=0 ; j < i ; j++) {
                                slotTotalWidth += megaSlots.eq(i).outerWidth(true);
                            }
                            //alert('Original slotTotalWidth ' + slotTotalWidth);
                            slotTotalWidth_temp = slotTotalWidth;
                            //alert('come break');
                            // breaking out of the entire (even parent loop) loops to the next executable
                            // after finding the neccessary max width for the megamenu-bin
                            //alert('megaSlots.eq(i).outerWidth(true) ' + megaSlots.eq(i).outerWidth(true));
                            slotTotalWidthTFDL = ((slotTotalWidth_temp / megaSlots.eq(i).outerWidth(true)) - $columnRemoved) * megaSlots.eq(i).outerWidth(true);
                            //alert('Customized slotTotalWidth ' + slotTotalWidth);
                            break;
                        }
                        // alert('immediately after come break');
                        // gurantee minimum 2 columns
                        if (slotTotalWidth/megaSlots.eq(i).outerWidth(true) > 2)
                            slotTotalWidthTFDL = slotTotalWidth - ($columnRemoved * megaSlots.eq(i).outerWidth(true));
                        else
                            slotTotalWidthTFDL = slotTotalWidth;
                    }
                    //alert('important slotTotalWidth ' + slotTotalWidth);
                    // Description: Set one or more CSS properties for the set of matched elements
                    megaBins.eq(k).css( 'width' , slotTotalWidthTFDL);
                    //library TFDL
                    //$customOffset = slotTotalWidth * 0.2;
                    //alert('slot ' + megaSlots.eq(i).outerWidth(true));
                    //slotTotalWidth = slotTotalWidth - (megaSlots.eq(i).outerWidth(true) * 2);
                    // Description: Set the CSS width of each element in the set of matched elements
                    megaBins.eq(k).width(slotTotalWidthTFDL);
                }
                else {
                    /* set bin width for vertical slots */
                    megaBins.eq(k).css( 'width' , megaSlots.eq(0).outerWidth(true) );
                }
                /* auto bin width end */
                /* off-page shift start */
                //var edgeOverlap = ($(window).width() - (megaBins.eq(k).offset().left + megaBins.eq(k).outerWidth(true)));
                //alert('offset.left ' + megaBins.eq(k).offset().left + ' outerWidth ' + megaBins.eq(k).outerWidth(true));
                $pageOffsetLeft = ($(window).width() - $pageWidth)/2;
                //alert('pageOffsetLeft ' + $pageOffsetLeft);
                var edgeOverlap = ($pageWidth - ((megaBins.eq(k).offset().left - $pageOffsetLeft) + megaBins.eq(k).outerWidth(true)));
                //alert('edgeOverlap ' + edgeOverlap);
                if (edgeOverlap < 0) {
                    megaBins.eq(k).css('left',(edgeOverlap) + 'px');
                }
                /* off-page shift end */
            }
        }

        // Open Mega Menu Function - bound
        function megamenu_open_progress() {
            if ($(this).find('ul.megamenu-bin').get(0)) {
                $(this).find('h2').addClass('megamenu-active');
            }
        }
        function megamenu_close_progress() {
            $(this).find('h2').removeClass('megamenu-active');
        }

        $('.megamenu-parent').bind('megamenu_open', megamenu_open_progress);
        $('.megamenu-parent').bind('megamenu_close', megamenu_close_progress);

        $('.megamenu-parent-title').bind('mouseover', megamenu_open);
        $('.megamenu-parent-title').bind('mouseout', megamenu_timer);

        $('.megamenu-bin').bind('mouseover', megamenu_open);
        $('.megamenu-bin').bind('mouseout', megamenu_timer);

        $("body").bind('click', megamenu_closeAll);
        $(".megamenu-menu").bind('click', megamenu_stopPropagation);

        $(window).bind('resize', megamenu_sizer);
        megamenu_sizetimer();
    });
})(jQuery);
