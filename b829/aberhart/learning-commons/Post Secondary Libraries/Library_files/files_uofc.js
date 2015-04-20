/**
 * uofc FILES Module js
 *
 * UofC Drupal Media and Files Services
 *
 * PHP version 5.2, for Drupal 7.x
 *
 * @file        files_uofc.js
 * @author      Manraj Singh Hallan (mhallan)
 *
 * @copyright   2012 University of Calgary
 * @version     SVN: $Id:$
 */

(function ($) {
  Drupal.files_uofc = Drupal.files_uofc || {};

  Drupal.behaviors.files_uofc = {
    attach: function (context) {

    jQuery(document).ready(function(){

      // Make Plupload default for file field source upload and hide Upload
      $('a.filefield-source-upload').hide();
      $('a.filefield-source-plupload').text('Upload');

      // Add delay to click event as it doesn't work properly without it 
      window.setTimeout(function() { $('a.filefield-source-plupload').click(); }, 200 );
   
      // Hide the Import media link on SITE/admin/content/media
      if( $('ul.action-links li:last-child').text() == 'Import media' )
        $('ul.action-links li:last-child').hide();

    });
    
    }  
  };
})(jQuery);
