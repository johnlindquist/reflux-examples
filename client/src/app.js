let React = require("react");
let Reflux = require("reflux");

let store = Reflux.createStore({});

let One = React.createClass({
    getInitialState() {
        return {message: ""}
    },

    componentDidMount() {
        this.unsub = store.listen(this.onStoreChange);
    },

    onStoreChange(message) {
    },

    componentWillUnmount() {
        this.unsub();
    },

    render() {
        return (<div>One: {this.props.num}</div>);
    }
});

let Two = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState() {
        return {message: ""}
    },


    componentDidMount() {
        //this.listenTo instead of store.listen
        console.log("didMount");
        this.listenTo(store, this.onStoreChange);
    },

    componentWillUnmount() {
        console.log("unmounting");
    },

    componentDidUpdate(){
        console.log("updating");
    },

    onStoreChange(message) {
    },

    //no need for willUnmount

    render() {
        return (<div>Two: {this.props.num}</div>)
    }
});

let Three = React.createClass({
    mixins: [Reflux.listenTo(store, 'onStoreChange')],

    getInitialState() {
        return {message: ""}
    },
    //no didMount or willUnmount

    onStoreChange(message) {
    },

    render() {
        return (<div>Three: {this.props.num}</div>)
    }
});

let Four = React.createClass({
    //bug: https://github.com/spoike/refluxjs/pull/227
    //mixins: [Reflux.connect(store, 'store')],

    render() {
        return (<div>Four: {this.props.num}</div>)
    }
});


let App = React.createClass({
    mixins: [Reflux.connect(store, 'store')],

    render() {
        let one, two, three, four = null;
        if (this.state.store % 1 == 0) one = <One num={this.state.store}></One>;
        if (this.state.store % 2 == 0) two = <Two num={this.state.store}></Two>;
        if (this.state.store % 3 == 0) three = <Three num={this.state.store}></Three>;
        if (this.state.store % 4 == 0) four = <Four num={this.state.store}></Four>;

        return (<div>
            {one}
            {two}
            {three}
            {four}
        </div>)
    }
});

React.render(<App></App>, document.body);


let count = 0;
setInterval(function () {
    store.trigger(count++)
}, 1000);
