import Ember from 'ember';

export default Ember.Service.extend({

    status: null,
    authenticated: null,
    id: null,

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
                            version: 'v2.8'
                        });

                        window.FB.getLoginStatus(function(response) {

                            self.set('status', response.status);

                            if ( response.status === 'connected' ) {

                                self.set('authenticated', true);
                                self.set('password', response.authResponse.userID);
                                self.set('id', response.authResponse.userID);

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

    login(scope) {

        var defaultScope = 'email,public_profile,user_website';

        if ( !scope ) {
            scope = defaultScope;
        } else {
            scope = defaultScope + ',' + scope;
        }

        var self = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {

            window.FB.login(function(response) {

                if ( response.authResponse ) {

                    if ( response.authResponse.grantedScopes.split(',').length >= scope.split(',').length ) {

                        self.set('password', response.authResponse.userID);
                        self.set('id', response.authResponse.userID);

                        resolve(response);

                    } else {
                        reject({ error: 'scope'});
                    }

                } else {
                    
                    reject({ error: 'cancel'});

                }

            }, { scope: scope, return_scopes: true });

        });

    },

    // ME ----------------------------------------------------------------------

    me(fields) {

        var defaultFields = 'last_name,first_name,about,email,cover,gender,hometown,is_verified,link,locale,location,quotes,verified,picture.type(large)';

        if ( !fields ) {
            fields = defaultFields;
        } else {
            fields = defaultFields + ',' + fields;
        }

        return new Ember.RSVP.Promise(function(resolve, reject) {

            window.FB.api('/me', { fields: fields }, function(response) {
                if ( !response || response.error ) {
                    reject(response);
                } else {
                    resolve(response);
                }
           });

        });

    },

    // PICTURE -----------------------------------------------------------------

    picture() {

        var self = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {

            window.FB.api(self.get('id')+'/picture?redirect=false&type=large', function(response) {
                if ( !response || response.error || !response.data ) {
                    reject(response);
                } else {
                    resolve(response.data);
                }
           });

        });

    },

    // PHOTOS ------------------------------------------------------------------
    /*
    photos(fields, type) {

        var self = this;

        var defaultFields = 'images,name,can_delete,from,place';

        if ( !fields ) {
            fields = defaultFields;
        } else {
            fields = defaultFields + ',' + fields;
        }

        if ( !type ) {
            type = "profile";
        }

        return new Ember.RSVP.Promise(function(resolve, reject) {

            window.FB.api(self.get('id')+'/photos', { fields: fields, type: type }, function(response) {

                if ( !response || response.error || !response.data ) {
                    reject(response);
                } else {
                    resolve(response.data);
                }

           });

        });

    },
    */
    // PAGES --------------------------------------------------------------------

    pages(fields) {

        var defaultFields = "access_token,name,username,picture.type(square)";

        if ( !fields ) {
            fields = defaultFields;
        } else {
            fields = defaultFields + ',' + fields;
        }

        return new Ember.RSVP.Promise(function(resolve, reject) {

            window.FB.api('me/accounts', { fields: fields, type: "page" }, function(response) {
                if ( !response || response.error || !response.data ) {
                    reject(response);
                } else {
                    resolve(response.data);
                }
           });

        });

    },

    page(fields) {

        var self = this;

        var defaultFields = 'name,username,website,fan_count,link,about,birthday,category,company_overview,current_location,picture.type(large),contact_address,store_location_descriptor,description,cover,emails,founded,general_info,personal_info,phone,mission,is_community_page,is_unclaimed,is_published,is_verified';

        if ( !fields ) {
            fields = defaultFields;
        } else {
            fields = defaultFields + ',' + fields;
        }

        return new Ember.RSVP.Promise(function(resolve, reject) {

            window.FB.api(self.get('id'), { fields: fields }, function(response) {
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
