const express = require('express');
const LojaController = require('./controllers/LojaController')
const ProdutoController = require('./controllers/ProdutoController')

const routes = express.Router();

routes.post('/api/loja', LojaController.save)
routes.get('/api/loja', LojaController.findAll)
routes.get('/api/loja/:id', LojaController.findById)
routes.delete('/api/loja/:id', LojaController.deleteById)
routes.delete('/api/loja/:loja_id/produto', LojaController.removeProduct)

routes.get('/api/loja/produto/search/:modelo', LojaController.searchProductByModel)

routes.post('/api/produto', ProdutoController.save)
routes.get('/api/produto', ProdutoController.findAll)
routes.get('/api/produto/:id', ProdutoController.findById)
routes.delete('/api/produto/:id', ProdutoController.deleteById)


module.exports = routes;