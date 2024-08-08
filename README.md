# MMM-MealieShoppingList

[![GitHub issues][issues-shield]](https://github.com/btoconnor/MMM-MealieShoppingList/issues)
[![GitHub pull requests][pull-requests-shield]](https://github.com/btoconnor/MMM-MealieShoppingList/pulls)
[![GitHub forks][forks-shield]](https://github.com/btoconnor/MMM-MealieShoppingList/network)
[![GitHub stars][stars-shield]](https://github.com/btoconnor/MMM-MealieShoppingList/stargazers)
[![License][license-shield]](https://github.com/btoconnor/MMM-MealieShoppingList/blob/master/LICENSE)

[![Build status][build-status-shield]](https://github.com/btoconnor/MMM-MealieShoppingList/actions/workflows/automated-tests.yaml)
[![Last commit][last-commit-shield]](https://github.com/btoconnor/MMM-MealieShoppingList/commits/main)
[![Commits][commits-shield]](https://github.com/btoconnor/MMM-MealieShoppingList/commits/main)

**MMM-MealieShoppingList is a module for [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) that displays your [Mealie][https://mealie.io] meal plan for the week.**

## Description

This module shows your shopping list from [Mealie][https://mealie.io].

Mealie is an intuitive and easy to use recipe management app. It's designed to make your life easier by being the best recipes management experience on the web and providing you with an easy to use interface to manage your growing collection of recipes.

Mealie is self-hostable, meaning you can run it on your own server without any reliance on cloud-services.

## How it Works

After you installed MMM-MealieShoppingList you just configure it to your needs and that's it. You will need to provide the Mealie `host` and credentials as an `apiKey`.

For more information see the [Configuration](#configuration) section.

## Installation

Just clone `MMM-MealieShoppingList` into the modules folder of your MagicMirror² installation:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/btoconnor/MMM-MealieShoppingList
```

## Update

Go to the `MMM-MealieShoppingList` folder inside MagicMirror² modules folder and pull the latest version from GitHub:

```bash
cd ~/MagicMirror/modules/MMM-MealieShoppingList
git pull
```

Restart MagicMirror² after updating.

## Configuration

In order to use this module, you simply need to provide the `host` `apiKey`, and the `shoppingListID` of the shopping list you'd like to display..

These are the possible options:

<!-- prettier-ignore-start -->
| Option                          | Description    |
|---------------------------------|----------------|
| `host`                          | <p>The URL to your Mealie instance.</p><p>**REQUIRED**<br>**Type:** `string`<br>**Example:** `"https://mealie.yourdomain.com"`<br>**Default value:** none</p>|
| `apiKey`                        | <p>An API key generated from a user profile in Mealie.</p><p>**REQUIRED** **Type:** `string`<br>**Example:** `"eyhJbcG..."`<br>**Default value:** none</p><p>**Note:** You can generate a key by going to your user profile in Mealie then to API Tokens link (or using this path `/user/profile/api-tokens`).</p>|
| `shoppingListID`                | <p>The UUID of the shopping list you'd like to display.</p><p>
| `updateInterval`                | <p>The time in seconds when the shopping list should be updated.</p><p>**Type:** `integer`<br>**Example:** `300` (The shopping list will be refreshed every 5 minutes.)<br>**Default value:** `60` (1 minute)<br>**Unit:** `seconds`</p>|
<!-- prettier-ignore-end -->

Here is an example of an entry in `config.js`. Take note of `mealTypeName` and `mealSortOrder`. Here, we use the `side` meal type as a reminder of things we need to do to prepare for future meals, e.g., thaw meat. `mealTypeName` changes what appears, and `mealSortOrder` moves the side entries to the top of the list for each day.

```javascript
{
    module: "MMM-MealieShoppingList",
    header: "Grocery List",
    position: "top_left",
    config: {
        apiKey: "eyhJbcG...",
        host: "https://mealie.example.com",
        shoppingListID: "4e9a8747-f4cd-4403-845e-6e0ba471b76d" // Change me with your shopping list ID
    }
},
```

## Special Thanks

- [Joshua Clark](https://github.com/zanix) for creating the project [MMM-MealieMenu](https://github.com/zanix/MMM-MealieMenu), for which this project is heavily based on.
- [Michael Teeuw](https://github.com/MichMich) for creating the project [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror). You can sponsor the MagicMirror² project on their [donate](https://magicmirror.builders/#donate) page.

