var argv = require("yargs").usage("usage: node $0 --x=[num] --y=[num]")
			.demand(['x','y'])
			.argv;
			
var rectangle  = require("rectangle")


function nice_solve(x,y) {
	rectangle(x,y, function(error, object) {
		if (error) {
			console.log(error)
		} else {	
			console.log("Rectangle", x, "by", y, "has:")
			console.log("\t area of", object.area());
			console.log("\t perimeter of", object.perimeter());
		}
	})
}

nice_solve(argv.x, argv.y)
