/* jshint node: true */
'use strict';

module.exports = {

  name: 'sq-ember-facebook',

  contentFor: function(type, config) {
      if ( type === 'head' ) {
        if ( config.FACEBOOK ) {
              if ( config.FACEBOOK.appId ) {
                  return "<script>(function(d, s, id){var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s); js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>";
              }
          }
      }
  },

  isDevelopingAddon: function() {
      return true;
  },

};
