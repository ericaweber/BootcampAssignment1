var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {

  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

   //check if url is listings or not
   if (parsedUrl.pathname == '/listings'){

      // set status to successful
      response.statusCode = 200;

      // print out listing data
      response.write(listingData);
      response.end();
   } 
   else {
      // send 404 error
      response.statusCode = 404;
      response.write("Bad gateway error");
      response.end();
   }


};

fs.readFile('listings.json', 'utf8', function(err, data) {
   /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */

    // set data to listingData 
    listingData = data;

    //console.log(listingData);

    // start server
    server = http.createServer(requestHandler 

      //response.writeHead(200, {'Content-Type': 'text/plain'});

    ).listen(port);

    console.log('Server listening on ' + port);


});
