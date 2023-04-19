const debug = require('debug')('frontend-code-challenge');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');

// import cors
const cors = require('cors');
const items = require('./routes/items');
const app = express();
const log = logger(app);
app.use(cors()); // use cors middleware to allow cross origin requests from the frontend app (localhost:3000)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Static')));

app.use('/items', items);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
    log.error(err);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), function () {
    log.info('Backend server listening on http://localhost:%d', server.address().port);
});