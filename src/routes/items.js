const { processItemByQuery, processItemById } = require('../controllers/items');
const { STATUS_CODE } = require('../config/constants');
const logger = require('../helpers/logger');

const setRoutes = app => {
  app.get('/api/items', async (req, res) => {
    const query = req.query.q;
    const limit = req.query.limit;

    try {
      logger.info(`Searching items - Search: '${query}'`);
      const response = await processItemByQuery({ query, limit });
      res.status(STATUS_CODE.OK).json(response);
    } catch (error) {
      const { status, message } = error.response.data;
      logger.info(`Error: ${message}`);
      res.status(status).send({ message });
    }
  });

  app.get('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
      logger.info(`Searching item id: ${itemId}`);
      const response = await processItemById(itemId);
      res.status(STATUS_CODE.OK).json(response);
    } catch (error) {
      const { status, message } = error.response.data;
      logger.info(`Error: ${message}`);
      res.status(status).send({ message });
    }
  });
};

module.exports = { setRoutes };
