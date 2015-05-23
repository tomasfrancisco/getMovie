/**
 * Created by tfrancisco on 22/05/15.
 */

if(Meteor.isServer) {
    Meteor.methods({
        getMoviePlus: function (id) {
            try {
                return HTTP.get("http://www.omdbapi.com/?i=" +
                    id);
            } catch (err) {

                throw _.extend(new Error("Failed to fetch getMoviePlus on OMDB. " + err.message),
                    {response: err.response});
            }
        },
        getShowPlus: function (id) {
            try {
                return HTTP.get("http://www.omdbapi.com/?i=" +
                    id);
            } catch (err) {

                throw _.extend(new Error("Failed to fetch getShowPlus on OMDB. " + err.message),
                    {response: err.response});
            }
        }
    });
}