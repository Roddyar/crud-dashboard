const cors = require('cors');
const express = require('express');
const path = require('path');

const ngApp = express();

ngApp.use(cors());

ngApp.options('*', cors());

//CORS Middleware
ngApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

ngApp.use(express.static('./dist/crud-dashboard'));

ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/crud-dashboard/index.html'));
});

ngApp.listen(process.env.PORT || 8080);
