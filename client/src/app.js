let React = require("react");
let Reflux = require("reflux");

let actions = Reflux.createActions([
    "sing",
    "dance",
    "nap",
    "repeat"
]);

let store = Reflux.createStore({
    listenables: [actions],

    onSing() {
        console.log("sing!");
    },

    onDance() {
        console.log("dance");
    },

    onNap() {
        console.log("napping");
    },

    onRepeat() {
        console.log("repeating");
    },
});


actions.sing();
actions.dance();
actions.nap();
actions.repeat();
