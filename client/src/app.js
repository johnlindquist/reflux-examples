let React = require("react");
let Reflux = require("reflux");

let action = Reflux.createAction();

let store = Reflux.createStore({
    init(){
        this.listenTo(action, this.onAction);
    },

    onAction(){
        console.log("Lights, candy, ACTION!");
    }
});

action(); //call me from anywhere