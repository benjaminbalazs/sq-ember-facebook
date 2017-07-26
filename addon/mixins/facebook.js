import Ember from 'ember';

export default Ember.Mixin.create({

    facebookui: Ember.inject.service(),
    store: Ember.inject.service(),

    /*
    // PHOTO -------------------------------------------------------------------

    createFacebookPhoto(data, user, page) {

        var self = this;

        return new Ember.RSVP.Promise(function(resolve) {

            var model = self.get('store').createRecord('facebook-photo', {
                facebook_id: data.id,
                name: data.name,
                link: data.link,
                width: data.width,
                height: data.height,
                images: data.images,
                from: data.from,
            });

            if ( user ) { model.set('user', user); }

            if ( page ) { model.set('page', page); }

            if ( data.picture ) {
                if ( data.picture.url ) {
                    model.set('image',  data.picture.url);
                }
            }

            if ( data.place ) {
                if ( data.place.location ) {
                    model.set('location', location);
                }
            }

            resolve(model);

        });

    },
    */

    // PAGE --------------------------------------------------------------------

    createFacebookPage(data, user) {

        var self = this;

        return new Ember.RSVP.Promise(function(resolve) {

            // BASICS

            var model = self.get('store').createRecord('facebook-page', {
                facebook_id: data.id,
                name: data.name,
                username: data.username,
                link: data.link,
                is_community_page: data.is_community_page,
                is_unclaimed: data.is_unclaimed,
                is_published: data.is_published,
                is_verified: data.is_verified,
                fan_count: data.fan_count,
            });

            model.set('user', user);

            model = self.fillFacebookPage(model, data);

            resolve(model);

        });

    },

    updateFacebookPage(model, data) {

        model = this.fillFacebookPage(model, data);

        return model.save();

    },

    fillFacebookPage(model, data) {

        // ADDITIONAL INFO

        if ( data.about ) { model.set('about', this.truncateString(data.about)); }

        if ( data.founded ) { model.set('founded', data.founded); }

        if ( data.category ) { model.set('category', data.category); }

        if ( data.mission ) { model.set('mission', data.mission); }

        if ( data.birthday ) { model.set('birthday', data.birthday); }

        if ( data.company_overview ) { model.set('company_overview', this.truncateString(data.company_overview)); }

        if ( data.current_location ) { model.set('current_location', data.current_location); }

        if ( data.contact_address ) { model.set('contact_address', data.contact_address); }

        if ( data.store_location_descriptor ) { model.set('store_location_descriptor', data.store_location_descriptor); }

        if ( data.description ) { model.set('description', this.truncateString(data.description)); }

        if ( data.general_info ) { model.set('general_info', this.truncateString(data.general_info)); }

        if ( data.personal_info ) { model.set('personal_info', this.truncateString(data.personal_info)); }

        if ( data.phone ) { model.set('phone', data.phone); }

        if ( data.personal_info ) { model.set('personal_info', this.truncateString(data.personal_info)); }

        // IMAGES

        if ( data.picture ) {
            if ( data.picture.data ) {
                if ( data.picture.data.url ) {
                    model.set('image',  data.picture.data.url);
                }
            }
        }

        if ( data.cover ) {
            if ( data.cover.source ) {
                model.set('cover_image', data.cover.source);
            }
        }

        return model;

    },

    getFacebookPage(facebook_id) {

        return this.get('store').query('facebook-page', { facebook_id: facebook_id }).then(function(list) {

            return list.get('firstObject');

        }).catch(function() {

            return Ember.RSVP.Promise.resolve(null);

        });

    },

    // USER --------------------------------------------------------------------

    createFacebookUser(authResponse, data) {

        var self = this;

        return new Ember.RSVP.Promise(function(resolve) {

            var model = self.get('store').createRecord('facebook-user', {

                access_token: authResponse.accessToken,
                facebook_id: authResponse.userID,
                signed_request: authResponse.signedRequest,
                expires_in: authResponse.expiresIn,

            });

            model = self.fillFacebookUser(model, data);

            resolve(model);

        });

    },

    updateFacebookUser(model, data, authResponse) {
        
        model = this.fillFacebookUser(model, data, authResponse);

        return model.save();

    },

    fillFacebookUser(model, data, authResponse) {

        // MANDATORY FIELDS --------------------------------------------

        if ( data.email ) { model.set('email', data.email); }

        if ( data.first_name ) { model.set('first_name', data.first_name); }

        if ( data.last_name ) { model.set('last_name', data.last_name); }

        // EXTRA INFOS -------------------------------------------------

        if ( data.about ) { model.set('about', this.truncateString(data.about)); }

        if ( data.age_range ) { model.set('age_range', data.age_range); }

        if ( data.website ) { model.set('website', data.website); }

        if ( data.gender ) { model.set('gender', data.gender); }

        if ( data.locale ) { model.set('locale', data.locale); }

        if ( data.link ) { model.set('link', data.link); }

        if ( data.verified ) { model.set('verified', data.verified); }

        // IMAGES ------------------------------------------------------

        if ( data.cover ) {
            if ( data.cover.source ) {
                model.set('cover_image', data.cover.source);
            }
        }

        if ( data.picture ) {
            if ( data.picture.data ) {
                if ( data.picture.data.url ) {
                    model.set('image',  data.picture.data.url);
                }
            }
        }

        //

        if ( authResponse ) {
            model.set('access_token', authResponse.accessToken);
            model.set('signed_request', authResponse.signedRequest);
            model.set('expires_in', authResponse.expiresIn);
        }

        return model;

    },

    getFacebookUser(facebook_id) {

        return this.get('store').query('facebook-user', { facebook_id: facebook_id }).then(function(list) {

            return list.get('firstObject');

        }).catch(function() {

            return Ember.RSVP.Promise.resolve(null);

        });

    },

    truncateString(string, max) {
        if ( !max ) {
            max = 1024;
        }
        if ( string.length > max ) {
            return string.substring(0, max-5) + "...";
        } else {
            return string;
        }
    }

});
