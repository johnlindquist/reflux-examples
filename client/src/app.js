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
        this.setState({message})
    },

    componentWillUnmount() {
        this.unsub();
    },

    render() {
        if (this.state.store % 1 == 0) return (<div>One: {this.state.message}</div>);

        return null;
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
        this.setState({message})
    },

    //no need for willUnmount

    render() {
        return (<div>Two: {this.state.message}</div>)
    }
});

let Three = React.createClass({
    mixins: [Reflux.listenTo(store, 'onStoreChange')],

    getInitialState() {
        return {message: ""}
    },
    //no didMount or willUnmount

    onStoreChange(message) {
        this.setState({message})
    },

    render() {
        return (<div>Three: {this.state.message}</div>)
    }
});

let Four = React.createClass({
    mixins: [Reflux.connect(store, 'store')],

    render() {
        return (<div>Four: {this.state.store}</div>)
    }
});


let App = React.createClass({
    mixins: [Reflux.connect(store, 'store')],

    render() {
        let one, two, three, four = null;
        if (this.state.store % 1 == 0) one = <div>One: {this.state.store}</div>;
        if (this.state.store % 2 == 0) two = <div>Two: {this.state.store}</div>;
        if (this.state.store % 3 == 0) three = <div>Three: {this.state.store}</div>;
        if (this.state.store % 4 == 0) four = <div>Four: {this.state.store}</div>;

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
