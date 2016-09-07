/**
 * Created by vjtc0n on 9/7/16.
 */
var Immutable = require('immutable');

var basket = Immutable.Map({"milk":"yes", "flour":"no"});

basket = basket.set("flour", "yes");

console.log(basket);

//basket = Immutable.Map({"fruits":{"oranges":"no"}, "flour":"no"});

basket = basket.setIn(["fruits", "oranges"], "yes");

console.log(basket);

/*
* basket = {
*   fruits: {
*       oranges: yes
*   }
*
* }
* */