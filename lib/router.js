/**
 * Created by tfrancisco on 21/03/15.
 */

Router.map(function() {
    this.route('/', function() {
        this.render('auth');
    });

    this.route('/home', function () {
        this.render('home');
    });

    this.route('/friends', function () {
        this.render('friends');
    });

    this.route('/profile', function () {
        this.render('profile');
    });

    this.route('/testes', function() {
        this.render('testes');
    });

    this.route('/movies', function() {
        this.render('movies');
    });

    this.route('/moviesInfo', function() {
        this.render('moviesInfo');
    });

    this.route('/recommendations', function() {
        this.render('recommendations');
    });
});

/*var api = Router.route('/_oauth/trakt', { where: 'server' });
 api.get(function () {
 var code = this.params.query.code;

 //Meteor.call('exchangeCodeTrakt', code);

 var redirectUri = 'http://localhost:3000/home';

 this.response.writeHead(302,  {
 location: redirectUri
 });

 this.response.end();

 });

 */