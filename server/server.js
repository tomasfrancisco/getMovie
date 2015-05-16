if (Meteor.isServer) {
    // Allows client to delete user db
    Meteor.users.allow({
        remove: function() {
            return true
        }
    });
}