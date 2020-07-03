const cors = require('cors');
const express = require('express');
const path = require('path');

const ngApp = express();

ngApp.use(cors());

ngApp.options('*', cors());

ngApp.use(express.static('./dist/crud-dashboard'));

ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/crud-dashboard/index.html'));
});

ngApp.listen(process.env.PORT || 8080);
