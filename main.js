const path = require('path');
const truffleCompile = require('truffle-workflow-compile');
const Merger = require('sol-merger/lib/merger');

// eslint-disable-next-line no-underscore-dangle
const __dirconfig = path.join(__dirname, 'config');
// eslint-disable-next-line import/no-dynamic-require
const config = require(path.join(__dirconfig, 'config'));

const { storeContractInfo } = require('./db/database');

// Не использовать - перезатирает this
// const compile = util.promisify(truffleCompile.compile);

// eslint-disable-next-line camelcase
async function compile(contracts_directory, contracts_build_directory) {
  return new Promise((resolve, reject) => {
    truffleCompile.compile({
      contracts_directory,
      contracts_build_directory,
      all: true,
    }, (err, contracts) => {
      if (err) {
        reject(err);
      } else {
        resolve(contracts);
      }
    });
  });
}

async function main() {
  const contracts = await compile(
    path.join(__dirname, '/contracts'),
    path.join(__dirname, '/build'),
  );

  if (!contracts[config.token_name]) {
    throw new Error(`${config.token_name} contract missing in compiled smartcontracts list`);
  }

  const contract = contracts[config.token_name];

  const sourceFile = contract.sourcePath;
  if (!sourceFile) {
    throw new Error('Missing sourceFile in contract object');
  }

  const merger = new Merger({ delimeter: '\n\n' });

  const mergedSource = await merger.processFile(sourceFile, true);

  const info = {
    name: contract.contractName,
    abi: contract.abi,
    bytecode: contract.unlinked_binary,
    source: contract.source,
    mergedSource,
  };

  await storeContractInfo(info);

  process.exit(0);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});
