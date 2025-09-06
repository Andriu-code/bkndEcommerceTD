const express = require('express');

const { OrderController } = require('./controller')

const router = express.Router(); //manejar las rutas independientemente de la aplicacion

module.exports.OrdersAPI = (app) => {
    router
        .get('/', OrderController.getOrders)
        .get('/:id', OrderController.getOrder)
        .post('/', OrderController.createOrder)
        .put('/:id', OrderController.updateOrder)
        .delete('/:id', OrderController.deleteOrder)

    app.use('/api/orders', router)         //configurar la ruta
}