import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.PBACK_HOST ?? 'localhost';
  const port = process.env.PBACK_PORT ?? '3000';
  axios.defaults.baseURL = `http://${host}:${port}`;
};
