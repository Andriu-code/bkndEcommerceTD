const express = require('express');
const debug = require('debug')('app:main');
const cors = require('cors');

const { Config } = require('./src/config/index');

const { ProductsAPI } = require('./src/products/index')
const { UsersAPI } = require('./src/users/index')
const { CatalogAPI } = require('./src/catalog/index')
const { OrdersAPI } = require('./src/orders/index')

const { IndexAPI, NotFoundAPI } = require('./src/index/index')

const app = express();
app.use(cors());

app.use(express.json());

IndexAPI(app);

ProductsAPI(app);
UsersAPI(app);
CatalogAPI(app);
OrdersAPI(app);


NotFoundAPI(app);

//modulos

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
});