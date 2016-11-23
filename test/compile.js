var fs = require ('fs');

var src = fs.readFileSync(__dirname+'/../megabyte-strategy.js', 'utf8');

var a = src.split('//DEBUG');

if (!(a.length & 1)) {
	throw "Unclosed //DEBUG area";
}

src = a.filter(function(a,i){
return (i&1)===0;
}).join("\n");


fs.writeFileSync(__dirname+'/../megabyte-strategy-prod.js', src, 'utf8');
