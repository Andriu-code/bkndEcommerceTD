const express = require('express');

const { ProductController } = require('./controller')

const router = express.Router(); //manejar las rutas independientemente de la aplicacion

module.exports.ProductsAPI = (app) => {
    router
        .get('/', ProductController.getProducts)
        .get('/:id', ProductController.getProduct)
        .post('/', ProductController.createProduct)
        .put('/:id', ProductController.updateProduct)
        .delete('/:id', ProductController.deleteProduct)

    app.use('/api/products', router)         //configurar la ruta
}