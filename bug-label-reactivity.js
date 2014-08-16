var dep = new Deps.Dependency();

Schema = new SimpleSchema({
  "other": {
    type: String,
    label: "bla"
  },
  "field": {
    type: String,
    label: function () {
      dep.depend();
      return Date.now();
      if (!Deps.active) {
        console.warn("not reactive");
      }
    }
  }
});



if (Meteor.isClient) {
  Template.hello.greeting = function () {
    dep.depend();
    return Date.now();
  };
  
  setInterval(function () {
    dep.changed();
  }, 975);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
