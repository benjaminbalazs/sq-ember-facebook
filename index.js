/* jshint node: true */
'use strict';

module.exports = {

  name: 'sq-ember-facebook',

  contentFor: function(type, config) {
      if ( type === 'head-footer' ) {
        if ( config.FACEBOOK ) {
              if ( config.FACEBOOK.appId ) {
                  var meta = '<meta property="fb:app_id" content="'+config.FACEBOOK.appId+'" />';
                  var script = "<script>(function(d, s, id){var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src='//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId="+config.FACEBOOK.appId+"';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>";
                  return meta + script;
              }
          }
      }

  },

  isDevelopingAddon: function() {
      return true;
  },

};
