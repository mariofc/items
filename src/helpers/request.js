const axios = require('axios');
const axiosRetry = require('axios-retry');
const { TOTAL_REQUEST_RETRY } = require('../config/constants');

axiosRetry(axios, {
  retries: TOTAL_REQUEST_RETRY,
  shouldResetTimeout: true,
  retryDelay: axiosRetry.exponentialDelay,
});

module.exports = axios;
