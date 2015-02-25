(function ($) {
  $(document).ready(function() { 
    /**
   * If using the slideshow then load the slideshow controls
   */  
      $('.slideshow').cycle({
      fx: 'scrollHorz',
      prev: '#prev',
      next: '#next',
      speed: 500,
      timeout: 7000,
      pause: 1
    });
  
    $('.controls').show().fadeTo(1000, 0.5);
    $('.controls').hover(
      function() {
        $(this).fadeTo(100, 1.0);    
      },
      function() {
        $(this).fadeTo(100, 0.5);
      }  
      );
        
    var countleft = 0;
    var countright = 0;
    $(".slide").swipe( {
      //Generic swipe handler for all directions
      swipeLeft:function(event, direction, distance, duration, fingerCount) {
        $('.slideshow').cycle('next');
      },
      swipeRight:function(event, direction, distance, duration, fingerCount) {
        $('.slideshow').cycle('prev');
      },
      threshold:25
    });
        
  });
})(jQuery);
