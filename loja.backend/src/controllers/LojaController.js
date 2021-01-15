const { Op } = require('sequelize')
const Loja = require('../models/Loja')
const LojaProduto = require('../models/Loja_Produto');
const Produto = require('../models/Produto');

module.exports = {

  async findAll(req, res) {
    const lojas = await Loja.findAll({
      include: {
        association: 'produtos',
        through: { attributes: [] }
      }
    });
    res.json(lojas);
  },
  async searchProductByModel(req, res) {
    const {modelo} = req.params
    const result = await Produto.findAll({
      where: {
        modelo: {
          [Op.like]: modelo + "%"
        }
      }
    });
    return result;

  },
  async findById(req, res) {
    const loja_id = req.params.id;
    const lojas = await Loja.findByPk(loja_id);
    return res.json(lojas ? lojas : {})
  },

  async save(req, res) {

    const loja = req.body;
    let dbEntity = null;

    if (loja.id && loja.id > 0) {
      dbEntity = Loja.findByPk(loja.id);
      dbEntity = Object.assign(dbEntity, loja)
      result = await Loja.update(dbEntity, {
        where: {
          id: loja.id
        }
      })
    } else {
      dbEntity = await Loja.create(loja);
    }
    dbEntity.setProdutos([])

    if (loja.produtos && loja.produtos.length > 0) {
      for (let index = 0; index < loja.produtos.length; index++) {
        const element = loja.produtos[index];
        const prod = await Produto.findByPk(element.id);
        await dbEntity.addProduto(prod, {
          through: {
            quantidade_minima: element.quantidadeMinima,
            quantidade: element.total
          }
        });

      }
    }
    return res.json(dbEntity)
  },

  async deleteById(req, res) {
    const id = req.params.id;
    const deleted = await Loja.destroy({
      where: { id: id }
    });

    return res.json({ result: true });
  },
  async listProduct(req, res) {
    const { loja_id } = req.params;

    const loja = await Loja.findByPk(loja_id, {
      include: { association: 'produtos' }
    })
    return res.json(loja.produtos);
  },
  async removeProduct(req, res) {
    const { loja_id } = req.params;
    const { modelo } = req.body

    const loja = await Loja.findByPk(loja_id)

    if (!loja) {
      return res.status(400).json({ error: 'Loja Não existe' })
    }
    const product = await Produto.findOne({
      where: { modelo }
    })

    await loja.removeProduto(product)

    return res.json()
  }

  /*
    async save(req, res) {
      const { loja_id } = req.params;
      let produto = req.body;
  
      const store = await Loja.findByPk(loja_id);
  
      if (!store) {
        return res.status(400).json({ error: 'Store Not Found' })
      }
      console.log("Passei 1")
      const [produtoCriado, created] = await Produto.findOrCreate({
        where: { modelo: produto.modelo },
        defaults: { ...produto },
      });
      console.log(JSON.stringify(produtoCriado))
      try {
        await store.addProduto(produtoCriado,{});
      } catch (error) {
        console.log(error)
      }
  
      return res.json(store);
  
    },
    */
};