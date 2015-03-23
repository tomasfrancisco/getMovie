/**
 * Created by tfrancisco on 21/03/15.
 */

Router.map(function() {
    this.route('/', function() {
        this.render('auth');
    });

    this.route('/home', function () {
        this.render('home');
    })
});

var api = Router.route('/oauth', { where: 'server' });
api.get(function () {
        var code = this.params.query.code;

        Meteor.call('exchangeCodeTrakt', code);

        var redirectUri = 'http://localhost:3000';

        this.response.writeHead(302,  {
            location: redirectUri
        });

        this.response.end();

    });

