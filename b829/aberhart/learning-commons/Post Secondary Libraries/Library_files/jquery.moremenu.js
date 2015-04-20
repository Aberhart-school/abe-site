(function($) {
  $.fn.moremenu = function() {

    function moveMenuItems(initial) {
      moveMenuItemsIntoMore(initial);
      moveMenuItemsOutOfMore();
      sortNav();
      toggleMore();
    }
    
    function navAvailableSpace() {
      return self.width() - more.width() - 0;
    }

    function navItemWidths() {
      return $('> li', self).map(function() { return $(this).width() }).get();
    }

    function navItemCount() {
      // subtract one for the more menu
      return $('> li', self).size() - 1;
    }

    function navListWidth() {
      return navItemWidths().reduce(function(a, b) { return parseInt(a, 10) + parseInt(b, 10); });
    }

    function moveMenuItemsIntoMore(initial) {
      // current available space in the nav menu
      var availableSpace = navAvailableSpace();;
      var totalWidth = 0;
      var n;

      $('> li', self).each(function(i, li) {
        totalWidth = totalWidth + $(li).width();
        if (totalWidth >= availableSpace) {
          n = i + 1;
          return false;
        }
      });
      
      var navCount = navItemCount();
      for ( var i = n; i <= navCount; i++ ) {
        // move all items which do not fit into the more menu
        if (initial == true) {
          $('> li:nth-child(' + n + ')', self).appendTo($('> ul', more));
        }
        else {
          $('> li:nth-child(' + n + ')', self).prependTo($('> ul', more));
        }
      }
    }

    function moveMenuItemsOutOfMore() {
      // do nothing if there is nothing in more menu
      if ($('> ul > li', more).size() == 0) {
        return false;
      }
      $('> li', self).each (function () {
        // current available space in the nav menu
        var availableSpace = navAvailableSpace();
        // check how much space it would take to add an item from more to the nav menu
        // check how many items are already in nav menu, 
        // the width of the next one is the width of the first item in the more menu
        navCount = navItemCount();
        var itemWidth = itemWidths[navCount];
        totalWidth = navListWidth() + itemWidth;
        if (totalWidth >= availableSpace) {
          return false;
        }
        else { 
          $('> ul > li:nth-child(1)', more).appendTo(self);
        }
      });
    }
      
    function sortNav() {
      $('li.more').appendTo(self);
    } 

    function toggleMore() {
      if ($('> ul > li', more).size() > 0) {
        more.show();
      }
      else {
        more.hide();
      }
    }

    function createMore() {
       // add a more button to the menu
       self.append('<li class="more parent"><a href="#">More</a><ul>');
       var more = $('li.more', self);
       // hide the more button at first, since there is nothing in it
       more.hide();
       return more;
    }

    // ------------------------------------------------------------------------
    // keep track of original context
    var self = $(this);

    // calculate original width of the top level items
    // once they are moved to more they all become fixed width 
    // without storing these values we would lose the bility to tell 
    // whether there is enough space to move them back out
    var itemWidths = navItemWidths();
  
    // add a more button to the menu
    var more = createMore();

    // initial load seems to require the timeout to work reliably on small screens
    setTimeout(function() {
      moveMenuItems(true);
    }, 1);

    // listen for window resize
    $(window).on('resize', function () {
      moveMenuItems();
    });

  };
})(jQuery);
