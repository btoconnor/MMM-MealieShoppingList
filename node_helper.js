const NodeHelper = require('node_helper');
const Log = require("logger");

module.exports = NodeHelper.create({
    start() {
        Log.info(`Starting module: ${this.name} with identifier: ${this.identifier}`);

        this.apiKey = null;
    },

    socketNotificationReceived(notification, payload) {
        switch (notification) {
            case "MEALIE_SHOPPING_LIST_INIT":
                this.apiKey = payload.apiKey;

                this.initComplete(payload);
                break;
            case "MEALIE_SHOPPING_LIST_GET_ITEMS":
                this.getShoppingListItems(payload);
                break;
        }

    },

    initComplete(payload) {
        this.sendSocketNotification("MEALIE_SHOPPING_LIST_INITIALIZED", {
            identifier: payload.identifier
        });
    },

    getShoppingListItems(payload) {
        const url = new URL(`${payload.host}/api/groups/shopping/lists/${payload.shoppingListID}`);

        fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${payload.apiKey}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const items = data.listItems
                    .filter(item => item.checked === false)
                    .map((item) => {
                        return {
                            display: item.display,
                            quantity: item.quantity,
                            unit: item.unit
                        }
                    });

                this.sendSocketNotification("MEALIE_SHOPPING_LIST_DATA", {
                    identifier: payload.identifier,
                    items,
                });

            });
    },

});
