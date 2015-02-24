let React = require("react");
let Reflux = require("reflux");

var store = Reflux.createStore({
    getInitialState() {
        return {message: "Hello world"};
    }
});

let Comp = React.createClass({
    mixins: [Reflux.connect(store)],

    render() {
        return (<div>
            <h2>{this.state.message}</h2>
        </div>)
    }
});


React.render(<Comp></Comp>, document.body);
