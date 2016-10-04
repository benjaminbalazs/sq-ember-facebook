import Ember from 'ember';

export default Ember.Service.extend({

    status: null,
    authenticated: null,

    // INIT --------------------------------------------------------------------

    init() {

        this._super();

        var self = this;

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

                        window.FB.getLoginStatus(function(response) {

                            self.set('status', response.status);

                            if ( response.status === 'connected' ) {
                                self.set('authenticated', true);
                                self.set('password', response.authResponse.userID);
                            } else {
                                self.set('authenticated', false);
                            }

                        });

                    }
                };
            }
        }

    },

    // LOGIN -------------------------------------------------------------------

    login() {

        var self = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {

            window.FB.login(function(response) {

                if ( response.authResponse ) {

                    self.set('password', response.authResponse.userID);
                    resolve(response);

                }

                //user_website,user_about_me
            }, { scope: 'email,public_profile' });

        });

    },

    // ME ----------------------------------------------------------------------

    me() {

        return new Ember.RSVP.Promise(function(resolve, reject) {

            window.FB.api('/me', { fields: 'last_name,first_name,email,about,cover,gender,hometown,is_verified,link,locale,location,quotes,website,bio' }, function(response) {
                if ( !response || response.error ) {
                    reject(response);
                } else {
                    resolve(response);
                }
           });

        });

    },

    // FEED --------------------------------------------------------------------

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

    // -------------------------------------------------------------------------

    exist() {
        return ( window.FB );
    },


});
