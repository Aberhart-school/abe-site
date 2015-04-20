/**
 * Dropmenu v1.0.0
 * @author Risto Treksler
 * @copyright 2014
 */
(function($) {
  $.fn.dropmenu = function(params) {

    function isTouchDevice() {
      return 'ontouchstart' in window // works on most browsers 
        || Modernizr.touch ; // catch all else
    };

    function menuShow(context, delay) {
      // hide all the sibling submenus
      $(context).siblings().each( function() { 
        // unset hoverintent state
        if (this.hoverIntent_s) { this.hoverIntent_s = false; } 
        menuHide(this,1);
      });

      // define the menu and find the parent
      var menu = $('> ul', context);
      var parent = $(context).closest('ul');

      // position the menu
      // TODO: it is inefficient to do this here, because most menus never change
      positionMenu(menu, parent);

      // show the menu
      menu.stop().show(delay);
    }

    function menuHide(context, delay) {
      $('> ul', context).stop().hide(delay);
      // also hide all submenus
      $('> ul', context).find('ul').stop().hide(delay);
    }

    function markParents() {
      $('li:has(> ul)', self).addClass('parent').attr('aria-haspopup',true);
      $('li').not(':has(> ul)', self).removeClass('parent').attr('aria-haspopup',false);
    }

    function positionMenu(menu, parent) {
      if (!parent.hasClass('dropmenu')) {
        // menus are either positioned to the left or right
        var position = (menu.css('left') != 'auto' || $.browser.msie ) ? 'left' : 'right';
        // older versions of IE cannot render the flyouts to the left
        if ($.browser.msie) { menu.css('right', 'auto');}
        menu.css(position, parent.width() - 1 + 'px');
      }
    }

    // ------------------------------------------------------------------------

    // keep track of original context
    var self = $(this);

    // add a class so we can tell the plugin has been attached and we can style it properly
    this.addClass('dropmenu');

    // load moremenu extension if needed
    if ($.fn.moremenu && params['moremenu']) {
      self.moremenu();
    }

    // mark all parents
    markParents();

    // hide the submenus
    $('li ul', self).hide();
    
    if (isTouchDevice()) { 
      // Hide the menus if visible, when clicking outside the menu
      $('html').on('click', function() { $('li ul', self).hide(); });
      self.on('click', function(event) { event.stopPropagation(); });
      // make hover behave like iOS
      $('li a', self).on('click', function( event ) {
        // if this link has a hidden submenu (a sibling ul)
        if ($(this).siblings('ul:hidden').size() > 0) {
          // do not propagate the click
          event.preventDefault();
          // hide siblings
          $(this).closest('li').siblings().find('ul').hide();
          // define the menu and the parent
          var menu = $(this).siblings('ul');
          var parent = $(this).closest('ul');
          // position the menu
          // TODO: it is inefficient to do this here, because most menus never change
          positionMenu(menu, parent);
          // show the menu
          menu.stop().show();
        }
      });
    }
    else {
      // toggle the menus on hover
      params = { 
        over: function () { menuShow(this,1) },
        out: function () { menuHide(this,1) },
        timeout: 750
      };
      $('li', self).hoverIntent(params);
    }

  };
})(jQuery);
