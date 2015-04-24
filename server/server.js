if (Meteor.isServer) {
    Meteor.publish("userData", function () {
        if (this.userId) {
            //console.log(Meteor.users.find({_id: this.userId}));
            return Meteor.users.find({_id: this.userId});
        } else {
            this.ready();
            console.log("ready");
        }
    })
}



