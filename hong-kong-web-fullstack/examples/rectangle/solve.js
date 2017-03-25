var rectangle = require("rectangle")

function nice_solve(x,y) {

	try {	
		var object=rectangle(x,y)

		console.log("Rectangle", x, "by", y, "has:")
		console.log("\t area of", object.area());
		console.log("\t perimeter of", object.perimeter());
	}
	catch (error) {
		console.log(error);
	}
};

nice_solve(2,3)
nice_solve(5,6)
nice_solve(-6,2)
