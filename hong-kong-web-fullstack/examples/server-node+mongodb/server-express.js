var http = require("http")
var hostname = "localhost"
var port = 3001

var fs = require("fs")
var path = require("path")
var express = require("express")
var morgan = require("morgan")

var app = express()

app.use(morgan('dev'));

//alternative:
//app.use(express.static(__dirname + '/public'));

//alternative:

//parsing json to a javascript object:
var parser = require('body-parser')
//Express Router for /dishes
var router = express.Router()
router.use(parser.json())
router.route('/')
.all(function(req, res, next) {
	next()
})
.get(function(req, res, next) {
	res.status(404).send("Resource doesn't exists")
})

router.route("/:id")
.post(function(req, res, next) {
	var id = req.params.id
	var writer = fs.createWriteStream('./public/dishes/'+id)
	writer.on('finish', () => {
		console.log(`Dish ${id} were created!`);
	});
	writer.write(JSON.stringify(req.body))
	writer.end()
	res.writeHead(200, {'Content-Type' : 'text/plain'})
	res.end()
})
.put(function(req, res, next) {
	var id = req.params.id
	var dish
	fs.readFile('./public/dishes/'+id, "utf-8", function(err, data) {
		if (data) {
			dish = JSON.parse(data)

			var properties = ["color","collection","bought"]
			properties.forEach(function(item, index) {
				if (req.body[item]) { 
					dish[item] = req.body[item]
					console.log("updated dish."+item+" with value "+req.body[item]+" at index "+index)
				}
			})
			var writer = fs.createWriteStream('./public/dishes/'+id)
			writer.write(JSON.stringify(dish))
			writer.end()
			res.writeHead(200, {'Content-Type' : 'text/plain'})
			res.end()
		} else {
			res.writeHead(404, {'Content-Type' : 'text/plain'})
			res.end()
		}
	});
	res.on('finish', () => {
		if (res.status() == 200) console.log(`Dish ${id} were updated!`);
	});

})
.get(function(req, res, next) {
	if (isNaN(req.params.id)) {
		res.writeHead(403, {'Content-Type' : 'text/plain'})
		res.end('Dish ID must be a number')
	} else {
		var id = req.params.id
		fs.readFile('./public/dishes/'+id, "utf-8", function(err, data) {
			if (data) {
				res.writeHead(200, {'Content-Type' : 'application/json'})
				res.end(data)
			} else {
				res.writeHead(404, {'Content-Type' : 'text/plain'})
				res.end()
			}
		})
		res.on('finish', () => {
			if (res.status() == 200) console.log(`Dish ${id} were provided!`);
		});
	}
})
app.use("/dishes", router)

//app.post('/dishes/:id', function(req, res, next) {	/*...*/ })

app.get('/*html', function(req, res, next) {
	console.log("Request processing:",req.url, req.method)
	
	var file;

	if (req.url == '/') file="/index.html";
	else file=req.url;
	
	var stored = path.resolve("./public/"+file);
	if (path.extname(stored) == '.html') {
		fs.exists(stored, function(exists) {
			if (!exists) {
				res.writeHead(404, {'Content-Type' : 'text/html'})
				res.end('<h1>Sorry, file '+file+' not found')
				return
			} else {
				res.writeHead(200, {'Content-Type' : 'text/html'})
				fs.createReadStream(stored).pipe(res)
			}
		})
	} else {
		res.writeHead(403, {'Content-Type' : 'text/html'})
		res.end('<h1>Only .html files are allowed</h1>')
		return
	}
});

var server = http.createServer(app)

server.listen(port,hostname, function(){
	console.log(`Server running at ${hostname}:${port}...`)
})
