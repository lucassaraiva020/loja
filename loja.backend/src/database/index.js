const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Loja = require('../models/Loja')
const LojaProduto = require('../models/Loja_Produto');
const Produto = require('../models/Produto');

const connection = new Sequelize(dbConfig);

Loja.init(connection);
Produto.init(connection);
LojaProduto.init(connection);


Produto.associate(connection.models)
Loja.associate(connection.models)



module.exports = connection;