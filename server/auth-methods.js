if(Meteor.isServer) {
    Meteor.methods({
        'authTrakt': function () {
            var cliend_id = '4a88647d43ae8749b5dc67f9ca684efaaf37ccbe15aaa43c18581c575579c2fc';
            var redirect_uri = 'http://localhost:3000/home';

            //console.log('https://trakt.tv/oauth/authorize?response_type=code&client_id='+cliend_id+'&redirect_uri='+redirect_uri);
            return 'https://trakt.tv/oauth/authorize?response_type=code&client_id='+cliend_id+'&redirect_uri='+redirect_uri;

        },

        'exchangeCodeTrakt': function(code) {
            var cliend_id = '4a88647d43ae8749b5dc67f9ca684efaaf37ccbe15aaa43c18581c575579c2fc';
            var client_secret = 'c0972a4a905c5a2050f35b540813c12e3f97a3f08770d2a520e825c31fef38bc';
            var redirect_uri = 'http://localhost:3000/home';
            var grant_type = 'authorization_code';

            console.log(code);

            this.unblock();

            var data = {
                code            : code,
                client_id       : cliend_id,
                client_secret   : client_secret,
                redirect_uri    : redirect_uri,
                grant_type      : grant_type
            };

            var response = Meteor.http.post('https://api-v2launch.trakt.tv/oauth/token', {
                params: data
            });

            console.log(response);
        }
    });
}