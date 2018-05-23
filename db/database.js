const Sequelize = require('sequelize');

const { DATA_MYSQL_USER, DATA_MYSQL_PASS, DATA_MYSQL_HOST } = process.env;

const schema = {
  name: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false,
    primaryKey: true,
  },
  abi: {
    type: Sequelize.DataTypes.TEXT('long'),
    allowNull: false,
  },
  bytecode: {
    type: Sequelize.DataTypes.TEXT('long'),
    allowNull: false,
  },
  source: {
    type: Sequelize.DataTypes.TEXT('long'),
    allowNull: false,
  },
  mergedSource: {
    type: Sequelize.DataTypes.TEXT('long'),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DataTypes.DATE,
  },
  updatedAt: {
    type: Sequelize.DataTypes.DATE,
  },
};

const sequelize = new Sequelize({
  database: 'gonano',
  username: DATA_MYSQL_USER,
  password: DATA_MYSQL_PASS,
  host: DATA_MYSQL_HOST,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'dev' ? console.log : false,
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    timestamps: false,
  },
  pool: {
    max: 10,
    min: 1,
    idle: 30e3,
    acquire: 60e3,
    evict: 15e3,
  },
});

const smartcontractsModel = sequelize.define('ma_smartcontracts', schema, {
  timestamps: true,
  tableName: 'ma_smartcontracts',
});

/**
 * Сохраняет Имя, ABI, исходник и байткод контракта в базу
 * @param info {object} - { name: '', abi: [], bytecode: '', source: '', mergedSource: '' }
 */
async function storeContractInfo(info) {
  if (info.bytecode && !info.bytecode.startsWith('0x')) {
    throw new Error(`Invalid bytecode format: ${info.bytecode}`);
  }

  if (!Array.isArray(info.abi) || (Array.isArray(info.abi) && info.abi.length === 0)) {
    throw new Error(`Invalid abi: ${info.abi}`);
  }

  return smartcontractsModel.upsert({
    ...info,
    abi: JSON.stringify(info.abi),
  });
}

module.exports = {
  storeContractInfo,
};
