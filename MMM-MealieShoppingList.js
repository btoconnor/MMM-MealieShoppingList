/* global Module, Log, moment */
Module.register("MMM-MealieShoppingList", {
    requiresVersion: '2.2.0',

    defaults: {
        apiKey: "",
        host: "",
        username: "",
        password: "",

        updateInterval: 60,
    },

    /**
     * Core method, called when all modules are loaded and the system is ready to boot up.
     */
    start() {
        this.apiKey = null;
        this.initialized = false;

        this.updateInterval = 0;

        this.shoppingListItems = [];

        Log.info("MealieShoppingList Starting");

        this.sendSocketNotification("MEALIE_SHOPPING_LIST_INIT", {
            identifier: this.identifier,
            apiKey: this.config.apiKey,
        });

    },

    socketNotificationReceived(notification, payload) {
        if (payload.identifier === this.identifier) {
            switch (notification) {
                case "MEALIE_SHOPPING_LIST_INITIALIZED":
                    this.initialized = true;
                    this.startFetchingLoops(this.config.updateInterval);

                case "MEALIE_SHOPPING_LIST_DATA":
                    this.shoppingListItems = payload.items;

                    this.updateDom();
            }
        }
    },

    getStyles() {
        return ["MMM-MealieShoppingList.css"];
    },

    getTranslations() {
        return {
            en: "translations/en.json"
        };
    },

    getTemplate() {
        return "MMM-MealieShoppingList.njk";
    },

    getTemplateData() {
        return {
            items: this.shoppingListItems,
        };
    },

    startFetchingLoops(interval) {
        Log.info("Starting fetching loop for shopping list items");
        this.getShoppingListItems();

        if (this.updateInterval === 0) {
            this.updateInterval = setInterval(() => {
                this.getShoppingListItems();
            }, interval * 1000);
        }
    },

    getShoppingListItems() {
        Log.info("Getting shopping list items");

        this.sendSocketNotification("MEALIE_SHOPPING_LIST_GET_ITEMS", {
            identifier: this.identifier,
            apiKey: this.config.apiKey,
            host: this.config.host,
            shoppingListID: this.config.shoppingListID,
        });
    },

});
