const Token = artifacts.require('LiqNetToken');

module.exports = async (deployer) => {
  await deployer.deploy(Token);
};
