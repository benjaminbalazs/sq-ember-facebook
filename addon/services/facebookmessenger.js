import Service, { inject as service } from '@ember/service';
import config from 'ember-get-config';

export default Service.extend({

    fastboot: service(),

    initiate() {

        if ( this.shouldinit() ) {

            if ( config.FACEBOOK && config.FACEBOOK.appId ) {

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
