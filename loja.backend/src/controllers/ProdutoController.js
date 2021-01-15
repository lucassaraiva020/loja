const Produto = require('../models/Produto')

module.exports = {

  async findAll(req, res) {
    const produtos = await Produto.findAll();
    return res.json(produtos);
  },

  async findById(req, res) {
    const  produto_id  = req.params.id;
    const produtos = await Produto.findByPk(produto_id);
    return res.json(produtos ? produtos : {})
  },

  async save(req, res) {

    
    const produto = req.body;
    let dbEntity = null;

    if (produto.id && produto.id > 0) {
      dbEntity = Produto.findByPk(produto.id);
      dbEntity = Object.assign(dbEntity, produto)
      result = await Produto.update(dbEntity, {
        where: {
          id: produto.id
        }
      })
    } else {
      dbEntity = await Produto.create(produto);
    }

    return res.json(dbEntity);

  },
  async deleteById(req, res) {
    const id = req.params.id;
    const deleted = await Produto.destroy({
      where: { id: id }
    });

    return res.json({ result: true });
  }
};