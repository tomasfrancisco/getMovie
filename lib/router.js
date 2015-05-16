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
