const fs = require('fs');
const mecu = require('../build/mecu-utils.js');

console.log(mecu);

fs.readFile('../private/K562.DMSO.1000.txt', 'utf8', function (error, data) {
    var entries = mecu.parse(data);
    fs.writeFile("../private/test.json", JSON.stringify(entries), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    }); 
});
