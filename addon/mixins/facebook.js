import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

    facebookui: service(),
    store: service(),

    // PAGE --------------------------------------------------------------------

    async createFacebookPage(data, user) {

        let model = this.get('store').peekAll('facebook-page').findBy('facebook_id', data.id);

        if ( !model ) {
            model = this.get('store').createRecord('facebook-page', {
                facebook_id: data.id,
                user: user,
            });
        }

        model.set('access_token', user.get('access_token'));
        model.set('signed_request', user.get('signed_request'));
        model.set('expires_in', user.get('expires_in'));

        model.set('name', data.name);
        model.set('username', data.username);
        model.set('link', data.link);
        model.set('is_community_page', data.is_community_page);
        model.set('is_unclaimed', data.is_unclaimed);
        model.set('is_published', data.is_published);
        model.set('is_verified', data.is_verified);
        model.set('fan_count', data.fan_count);

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

        //

        await model.save();

        return model;

    },

    // USER --------------------------------------------------------------------

    async createFacebookUser(authResponse, data) {

        let model = this.get('store').peekAll('facebook-user').findBy('facebook_id', authResponse.userID);

        if ( !model ) {
            model = this.get('store').createRecord('facebook-user', {
                facebook_id: authResponse.userID,
            });
        }

        model.set('access_token', authResponse.accessToken);
        model.set('facebook_id', authResponse.userID);
        model.set('signed_request', authResponse.signedRequest);
        model.set('expires_in', authResponse.expiresIn);

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

        await model.save();

        return model;

    },

    //

    truncateString(string, max) {
        if ( !max ) { max = 1024; }
        if ( string.length > max ) {
            return string.substring(0, max-5) + "...";
        } else {
            return string;
        }
    }

});
