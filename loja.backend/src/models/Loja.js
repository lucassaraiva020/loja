const { Model, DataTypes } = require('sequelize');

class Loja extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING,
        allowNull: true
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rua: {
        type: DataTypes.STRING,
        allowNull: true
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      bairro: {
        type: DataTypes.STRING,
        allowNull: true
      },
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.belongsToMany(models.Produto, { foreignKey: 'loja_id', as: 'produtos', through: models.LojaProduto, });
  }
}

module.exports = Loja;