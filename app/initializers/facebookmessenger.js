import FacebookService from '../services/facebookmessenger';

export function initialize (app) {

	app.register('service:facebookmessenger', FacebookService);

    app.inject('route', 'facebookmessenger', 'service:facebookmessenger');
    app.inject('component', 'facebookmessenger', 'service:facebookmessenger');
    app.inject('controller', 'facebookmessenger', 'service:facebookmessenger');

}

export default {
    name: 'facebookmessenger',
    initialize: initialize
};
