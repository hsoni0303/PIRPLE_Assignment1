// Dependencies
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

// Create Server
const server = http.createServer(function (req, res) {

  // Get url and parse it
  let parsedUrl = url.parse(req.url, true);

  // get path
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Chosen Handler
  let chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

  chosenHandler(function (statusCode, payload) {

    payload = typeof(payload) == 'object' ? payload : {};
    let Response = JSON.stringify(payload);

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    res.end(Response);
  })

});

// Listen To Server
server.listen(3000, function () {
  console.log('Server is Listening at Port 3000');
})

// Defining Handler
let handlers = {};

// /hello Route Handler
handlers.hello = function (callback) {
  callback(200, { 'Welcome Message': 'Hello'});
};

// Not Found Handler
handlers.notFound = function (callback) {
  callback(406);
}

// Defining Router
let router = {
  'hello': handlers.hello
}