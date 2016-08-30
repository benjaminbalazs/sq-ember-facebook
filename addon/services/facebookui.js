import Ember from 'ember';

export default Ember.Service.extend({

    init() {

        this._super();

        var config = Ember.getOwner(this)._lookupFactory('config:environment');

        if ( config.FACEBOOK ) {
            if ( config.FACEBOOK.appId ) {
                window.fbAsyncInit = function() {
                    if ( config.FACEBOOK.appId ) {
                        window.FB.init({
                            appId: config.FACEBOOK.appId,
                            xfbml: true,
                                version: 'v2.5'
                        });
                        console.log('init');
                    }
                };
            }
        }

    },

    // FEED

    share(quote, domain) {
        var self = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if ( self.exist() ) {

                window.FB.ui({
                  method: 'share',
                  href: domain,
                  quote: quote,
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
