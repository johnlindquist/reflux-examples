let React = require("react");
let Reflux = require("reflux");
let _ = require("lodash");


let action = Reflux.createAction();

let store = Reflux.createStore({
    init(){
        this.listenTo(action, this.onAction);
    },

    onAction(){
        alert("Lights, candy, ACTION!");
    }
});

action(); //call me from anywhere