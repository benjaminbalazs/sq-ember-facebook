import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Service.extend({

    fastboot: Ember.inject.service(),

    init() {

        this._super();

        if ( this.shouldinit() ) {
        
            if ( config.FACEBOOK && config.FACEBOOK.appId ) {

                this.script(document, 'script', 'Messenger');

                window.extAsyncInit = function() {

                };

            }

        }

    },

    script(d, s, id) {

        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.com/en_US/messenger.Extensions.js";
        fjs.parentNode.insertBefore(js, fjs);

    },

    shouldinit() {
        if ( this.get('fastboot.isFastBoot') !== true ) {
            return true;
        } else {
            return false;
        }
    },

});
