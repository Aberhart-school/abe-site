(function ($) {
  $(document).ready(function() { 
    
    /**
     * If using random banners then hide all of them, and show only one randomly
     */
    var allBanners = $('.region-banner-image .banners .banner');
    allBanners.hide();
  
    var index = Math.floor(Math.random() * allBanners.length);
    allBanners.eq(index).show();  
    allBanners.eq(index).addClass("active");
  });
})(jQuery);
