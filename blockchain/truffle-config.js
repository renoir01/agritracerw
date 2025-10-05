/**
 * Truffle configuration for AGRITRACE smart contracts
 */

require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const MNEMONIC = process.env.MNEMONIC || '';
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

module.exports = {
  /**
   * Networks define how you connect to your ethereum client
   */
  networks: {
    // Development network (Ganache)
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 6721975,
      gasPrice: 20000000000
    },

    // Ropsten testnet (deprecated but still used for testing)
    ropsten: {
      provider: () => new HDWalletProvider(
        MNEMONIC,
        `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`
      ),
      network_id: 3,
      gas: 5500000,
      gasPrice: 10000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },

    // Goerli testnet (recommended for testing)
    goerli: {
      provider: () => new HDWalletProvider(
        MNEMONIC,
        `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`
      ),
      network_id: 5,
      gas: 5500000,
      gasPrice: 10000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },

    // Sepolia testnet (latest recommended testnet)
    sepolia: {
      provider: () => new HDWalletProvider(
        MNEMONIC,
        `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`
      ),
      network_id: 11155111,
      gas: 5500000,
      gasPrice: 10000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },

    // Ethereum mainnet (production)
    mainnet: {
      provider: () => new HDWalletProvider(
        MNEMONIC,
        `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
      ),
      network_id: 1,
      gas: 5500000,
      gasPrice: 20000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: false
    }
  },

  // Set default mocha options
  mocha: {
    timeout: 100000
  },

  // Configure compilers
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul"
      }
    }
  },

  // Truffle DB configuration
  db: {
    enabled: false
  },

  // Plugin configuration
  plugins: [
    'truffle-plugin-verify'
  ],

  // API keys for contract verification
  api_keys: {
    etherscan: ETHERSCAN_API_KEY
  }
};
