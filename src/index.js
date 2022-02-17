const express = require('express');
const cors = require('cors');
const { APP_PORT } = require('./config/environment');
const logger = require('./helpers/logger');
const { setRoutes } = require('./routes/items');

const app = express();

app.use(cors());

app.use('/api/items/health', require('express-healthcheck')());

setRoutes(app);

const server = app.listen(APP_PORT || 3000, () => {
  logger.info(`listening in port ${APP_PORT}`);
});

module.exports = { app, server };
