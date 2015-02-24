let React = require("react");
let Reflux = require("reflux");
let moment = require("moment");

var loggedIn = false;

let actions = Reflux.createActions([
    "toggleLogin",
    "post"
]);

actions.post.preEmit = ()=>{
  return moment().isBefore(moment().set('hour', 23));
};

actions.post.shouldEmit = (dateGuard)=> {
    if(!dateGuard){
        console.log(`
            Never, ever, post anything after 11pm...
        `);
    }

    if(!loggedIn){
        console.log("Please log in");
    }

    return loggedIn && dateGuard;
};


let store = Reflux.createStore({
    listenables: [actions],

    onToggleLogin() {
        loggedIn = !loggedIn;
        console.log(`Login status: ${loggedIn}`);
    },

    onPost() {
        console.log("posting");
    },
});

let Comp = React.createClass({
    mixins: [Reflux.connect(store)],

    render() {
        return (<div>

            <button onClick={actions.post}>Post</button>
            <button onClick={actions.toggleLogin}>Toggle Login</button>

        </div>)
    },
});

React.render(<Comp></Comp>, document.body);
