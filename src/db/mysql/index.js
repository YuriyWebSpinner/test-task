/* eslint-disable */
const { Sequelize } = require('sequelize');
const configuration = {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'mysqldb',
    port: process.env.MYSQL_LOCAL_PORT,
    dialect: 'mysql',
    logging: true,
    pool: {
        handleDisconnects: true,
        max: 1,
        min: 1,
        idle: 100000,
        acquire: 200000
    }
};

const { literal, Op, fn, col, where } = Sequelize;

const createConnection = (config) => {
  
  const connection = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      logging: config.logging,
      ssl: config.ssl,
      dialectOptions: config.dialectOptions,
      pool: config.pool
    }
  );
  
  connection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  return connection;
};

const sequelize = createConnection(configuration);

module.exports = {
  sequelize,
  Sequelize,
  literal,
  Op,
  fn,
  col,
  where
};
