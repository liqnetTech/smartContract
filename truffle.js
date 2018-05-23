const { DATA_PARITY_HOST } = process.env;

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    nanobox: {
      host: DATA_PARITY_HOST,
      port: 8545,
      network_id: '*', // Match any network id,
    },
  },
};
