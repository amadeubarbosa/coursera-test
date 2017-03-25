
module.exports = function(x,y,callback) {
	var object = {
		perimeter: function() {
			return 2*(x+y);
		},
		area: function() {
			return x*y;
		},
	}	

	var error = new Error("Rectangle dimensions should be greather than zero, but x="+ x +" y="+ y);

	if (callback) {
		if (x < 0 || y < 0) {
			callback(error, null);
		} else {
			callback(null, object);
		}
	} else {
		if (x < 0 || y < 0) { 
			throw error; 
		} else {
			return object;
		}
	}

};
