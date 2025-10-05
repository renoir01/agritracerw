const AgriTrace = artifacts.require("AgriTrace");

module.exports = function (deployer, network, accounts) {
  // Deploy AgriTrace contract
  deployer.deploy(AgriTrace).then(() => {
    console.log("AgriTrace contract deployed at:", AgriTrace.address);
    console.log("Owner account:", accounts[0]);
  });
};
