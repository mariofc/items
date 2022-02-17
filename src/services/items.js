const request = require('../helpers/request');
const { HOST_URL, TIMEOUT } = require('../config/environment');
const { GET } = require('../config/constants');

const getItemByQuery = async ({ query, limit = 50 }) => {
  const response = await request({
    method: GET,
    url: `${HOST_URL}/sites/MLA/search`,
    timeout: TIMEOUT,
    params: { q: query, limit },
  });

  return response.data;
};

const getItemById = async itemId => {
  const response = await request({
    method: GET,
    url: `${HOST_URL}/items/${itemId}`,
    timeout: TIMEOUT,
  });

  return response.data;
};

const getDescriptionById = async itemId => {
  const response = await request({
    method: GET,
    url: `${HOST_URL}/items/${itemId}/description`,
    timeout: TIMEOUT,
  });

  return response.data;
};

const getCategoryById = async categoryId => {
  const response = await request({
    method: GET,
    url: `${HOST_URL}/categories/${categoryId}`,
    timeout: TIMEOUT,
  });

  return response.data;
};

module.exports = { getItemByQuery, getItemById, getDescriptionById, getCategoryById };
