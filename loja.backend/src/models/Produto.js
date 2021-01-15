const { Model, DataTypes } = require('sequelize');

class Produto extends Model {
  static init(sequelize) {
    super.init({
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serial: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      local: {
        type: DataTypes.STRING,
        allowNull: false
      },
      observacoes: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      sequelize,
    })
  }
  static associate(models) {
    this.belongsToMany(models.Loja, { foreignKey: 'produto_id', through: models.LojaProduto, as: 'lojas' });
  }

}


module.exports = Produto;