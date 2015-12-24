import Ember from 'ember';

export default Ember.Service.extend({

    init() {

        this._super();

        var config = this.container.lookupFactory('config:environment');

        if ( config.FACEBOOK ) {
            if ( config.FACEBOOK.appId ) {
                if ( this.exist() ) {
                    window.FB.init({
                        appId: config.FACEBOOK.appId,
                        xfbml: true,
                        version: 'v2.5'
                    });
                }
            }
        }

    },

    // FEED

    feed(caption) {
        var self = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if ( self.exist() ) {

                window.FB.ui({
                  method: 'feed',
                  link: 'https://developers.facebook.com/docs/',
                  caption: caption,
                }, function(response) {
                    if ( response ) {
                        resolve();
                    } else {
                        reject();
                    }

                });
            } else {
                resolve();
            }
        });
    },

    exist() {
        return ( window.FB );
    },


});
