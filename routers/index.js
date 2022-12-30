const express = require('express');
const webRouter = require('./web');
const { apiRouter, apiRouterSecure } = require('./api');

const mainRouter = express.Router();

mainRouter.use('/', webRouter);
mainRouter.use('/api', apiRouter);
mainRouter.use('/api', apiRouterSecure);

module.exports = mainRouter;