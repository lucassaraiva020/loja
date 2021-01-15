const { Model, DataTypes } = require('sequelize');

class LojaProduto extends Model {
  static init(sequelize) {
    super.init({
      quantidade_minima: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      quantidade: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    }, {
      sequelize
    })
  }

}

module.exports = LojaProduto;