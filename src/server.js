const express = require('express');
const path = require('path');

const ngApp = express();

//CORS Middleware
app.use(function (req, res, next) {
//Enabling CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

ngApp.use(express.static('./dist/crud-dashboard'));

ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/crud-dashboard/index.html'));
});

ngApp.listen(process.env.PORT || 8080);
