let React = require("react");
let Reflux = require("reflux");

//available to *all* actions
Reflux.ActionMethods.updateAnalytics = (thing)=> {
    console.log(`updating analytics for ${thing.name}`);
};

var addToCart = Reflux.createAction();

addToCart.listen(function listen(thing){
    this.updateAnalytics(thing);
});

addToCart({name: "Diapers"});
