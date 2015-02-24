let React = require("react");
let Reflux = require("reflux");
let _ = require("lodash");

var actions = Reflux.createActions([
    "workIt",
    "makeIt",
    "doIt",
    "makesUs",
]);

var store = Reflux.createStore({
    init() {
        this.joinLeading(
            actions.workIt,
            actions.makeIt,
            actions.doIt,
            actions.makesUs,
            this.trigger
        )
    }
});

_.delay(actions.workIt, 100, "harder");
_.delay(actions.workIt, 200, "WHAT");

_.delay(actions.makeIt, 200, "better");
_.delay(actions.doIt, 300, "faster");
_.delay(actions.makesUs, 400, "stronger");


_.delay(actions.workIt, 200, "IS");
_.delay(actions.workIt, 250, "HAPPENING?!?!?!");
//If you want the last, use joinTrailing to grab the last workIt
//othewise, joinLeading will grab the data from the first
//joinConcat grabs *all* data from *every* call
//joinStrict will trigger an error if an action is called twice
_.delay(actions.workIt, 300, "WHAT!");

store.listen(function listen(first, second, third, fourth) {
        console.log(first, second, third, fourth)
    }
);
