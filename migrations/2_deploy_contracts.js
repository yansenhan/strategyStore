var ss = artifacts.require("./strategyStore.sol");

module.exports = function(deployer) {
  deployer.deploy(ss);
};
