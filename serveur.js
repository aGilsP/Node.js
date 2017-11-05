var http = require('http');
var url = require('url');
var querystring = require('querystring');
var Client = require('node-rest-client').Client;

var restUrl = "http://localhost:8080";
var restPath = "/camt/w/choristes";

var writeHeadBody = function (res) {
  res.write('<!DOCTYPE html>' +
    '<html>' +
    '    <head>' +
    '        <meta charset="utf-8" />' +
    '        <title>Ma page Node.js !</title>' +
    //'        <link rel="stylesheet" href="code.css" type="text/css">' +
    '    </head>' +
    '    <body>' +
    '    <table border="1" style="width:100%, dashed, border=1px; font-family:helvetica;" align="center">' +
    '<tr><th>Reference</th><th>Montant</th><th>Date</th><th align="left">Nom</th></tr>');
};

var processData = function (res, data) {
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].reference + "  " + data[i].montant + "\t" + data[i].nom);
    res.write('<tr align="center"">');
    res.write(
      '<td style="border=1px, dashed, red; " >' + data[i].reference +
      '</td><td>' + data[i].montant +
      '</td><td>' + data[i].date.dayOfMonth + ' ' + data[i].date.month + ' ' + data[i].date.year +
      '</td><td align="left">' + data[i].nom + '</td>');
    res.write('</tr>');
  }
};

var server = http.createServer(function (req, res) {
  var page = url.parse(req.url).pathname;
  //var params = querystring.parse(url.parse(req.url).query);
  
  res.writeHead(200, {"Content-Type": "text/html"});

  if (restPath === page.toString()) {
    var client = new Client();
    client.get(restUrl+restPath, function (data, response) {
      writeHeadBody(res);
      processData(res, data);
      res.write('</body></html>');

      res.end();
    });
  };

});
server.listen(8081);
