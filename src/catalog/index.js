const express = require('express');

const { CatalogController } = require('./controller')

const router = express.Router(); //manejar las rutas independientemente de la aplicacion

module.exports.CatalogAPI = (app) => {
    router
        .get('/', CatalogController.getTexts)
        .get('/:id', CatalogController.getText)
        .post('/', CatalogController.createText)
        .put('/:id', CatalogController.updateText)
        .delete('/:id', CatalogController.deleteText)

    app.use('/api/catalog', router)         //configurar la ruta
}