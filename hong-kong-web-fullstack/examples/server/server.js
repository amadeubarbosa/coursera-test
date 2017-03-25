var http = require("http")
var hostname = "localhost"
var port = 3001

var fs = require("fs")
var path = require("path")

var server = http.createServer(function(req, res) {
	console.log("Request processing:",req.url, req.method)
	
	var file;

	if (req.method == "GET") {
		if (req.url == '/') file="/index.html";
		else file=req.url;
	} else {
		var dishesResource = "/dishes/"
		if ((req.method == "POST") && req.url.includes(dishesResource)) {
			var newid = req.url.substring(dishesResource.length, req.url.length)
			var writer = fs.createWriteStream("./public"+dishesResource+newid)
			req.on('data', function(data) {
				writer.write(data);
			})
			req.on('end', function() {
				writer.on('finish', () => {
					console.log("Dish "+newid+" were created!");
				})
				writer.end()
			})
			res.writeHead(200, {'Content-Type' : 'text/plain'})
			res.end()
			return
		}

		res.writeHead(401, {'Content-Type' : 'text/html'})
		res.end('<h1>Only GET methods are supported</h1>')
		return
	}
	
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
})

server.listen(port,hostname, function(){
	console.log(`Server running at ${hostname}:${port}...`)
})
