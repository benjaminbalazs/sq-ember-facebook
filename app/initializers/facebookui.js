import FacebookService from '../services/facebookui';

export function initialize (app) {

	app.register('service:facebookui', FacebookService);

    app.inject('route', 'facebookui', 'service:facebookui');
    app.inject('component', 'facebookui', 'service:facebookui');
    app.inject('controller', 'facebookui', 'service:facebookui');

}

export default {
    name: 'facebookui',
    initialize: initialize
};
