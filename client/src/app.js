let React = require("react");
let Reflux = require("reflux");

let buyTrinket = Reflux.createAction();

let momAndPopStore = Reflux.createStore({
    init() {
        this.listenTo(buyTrinket, this.onBuyTrinket);
    },

    onBuyTrinket() {
        console.log(`Dad says, "Thanks for supporting our family!"`);
        this.trigger();
    },
});

let walmart = Reflux.createStore({
    init() {
        this.listenTo(momAndPopStore, this.onMomAndPopStore);
    },

    onMomAndPopStore() {
        console.log(`Walmart exec says, "Buy lot next door"`);
    },
});

buyTrinket();