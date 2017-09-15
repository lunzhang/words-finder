var fs = require('fs');
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./words.txt')
});
var words = {};

lineReader.on('line', function (line) {
  words[line] = line;
});
lineReader.on('close', function(val) {
  fs.writeFile('words.json', JSON.stringify(words), 'utf8', function() {
    console.log('written to file');
  });
})
