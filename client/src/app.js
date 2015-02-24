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
        this.trigger({message: "Singing!"});
    },

    onDance() {
        this.trigger({message: "Dancing!"});
    },

    onNap() {
        this.trigger({message: "Napping!"});
    },

    onRepeat() {
        this.trigger({message: "Repeating!"});
    },

    getInitialState() {
        return {message: ""};
    },
});

let Comp = React.createClass({
    mixins: [Reflux.connect(store)],

    render() {
        return (<div>

            <h2>What should I be doing? {this.state.message}</h2>
            <button onClick={actions.sing}>Sing</button>
            <button onClick={actions.dance}>Dance</button>
            <button onClick={actions.nap}>Nap</button>
            <button onClick={actions.repeat}>Repeat</button>
        </div>)
    },
});

React.render(<Comp></Comp>, document.body);
