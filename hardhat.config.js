require("@nomiclabs/hardhat-waffle");
// Or if that doesn't work:
// require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      chainId: 1337
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./frontend/src/artifacts",
    cache: "./cache",
    tests: "./test"
  },
};
