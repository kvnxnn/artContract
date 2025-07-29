require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY =
  "7b7cb0b027031c1517611b2e5a1e2148fdd2a5503462abe7eb6f7fa51a1884c7";
const RPC_URL =
  "https://polygon-amoy.g.alchemy.com/v2/xfeNC4oJH1UdHhLsNkYvHvL24TSX7GWG";

module.exports = {
  defaultNetwork: "polygon_amoy",
  networks: {
    hardhat: {
      chainId: 80002
    },

    polygon_amoy: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
