'use strict';

module.exports = {

  name: 'sq-ember-facebook',

  included: function(app) {

    this._super.included(app);

  },

  contentFor: function(type, config) {
      if ( type === 'head-footer' ) {
          if ( config.FACEBOOK ) {
              if ( config.FACEBOOK.appId ) {
                var meta = '<meta property="fb:app_id" content="'+config.FACEBOOK.appId+'" />';
                return meta;
              }
          }
      }
  },

  isDevelopingAddon: function() {
      return true;
  },

};
