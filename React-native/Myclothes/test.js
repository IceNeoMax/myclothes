/**
 * Created by vjtc0n on 11/23/16.
 */
var DATA = [];

for (var i=0; i<=10; i++) {
    DATA.push(Math.floor((Math.random() * 100) + 1))
}
console.log(DATA)
var NEWDATA = DATA;
var index = NEWDATA.indexOf(DATA[0])
NEWDATA.splice(index, 1);
console.log(NEWDATA);
