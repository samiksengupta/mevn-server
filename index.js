const express = require('express');
const { HOST, PORT, ENV } = require('./config/server');
const mainRouter = require('./routers');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mainRouter);

const server = app.listen(PORT, () => {
    process.stdout.write(`Server started at ${HOST}:${PORT} (${ENV})\n`);
});

module.exports = server;