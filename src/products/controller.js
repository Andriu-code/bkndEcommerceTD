const createError = require('http-errors');
const debug = require('debug')('app:module-products-controller');

const { ProductService } = require('./services')
const { Response } = require('../common/response')

module.exports.ProductController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductService.getAll();
            Response.success(res, 200, 'Products', products);
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    getProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductService.getById(id);
            if (!product) {
                Response.error(res, new createError.NotFound())
            } else {
                Response.success(res, 200, `Product ${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await ProductService.create(body);
                Response.success(res, 201, 'Producto Creado', insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const product = await ProductService.update(id, body);
                Response.success(res, 201, `Producto Actualizado ${id}`, body)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params; // Obtener el ID de los parámetros de la URL
            if (!id) {
                return Response.error(res, new createError.BadRequest("ID es requerido"));
            }
            const product = await ProductService.deleteProduct(id);

            if (!product) {
                // Si la tarea no se encuentra, devolvemos un error 404
                return Response.error(res, new createError.NotFound(`Producto no encontrado con id: ${id}`));
            }
            Response.success(res, 200, `Producto eliminado con id: ${id}`);

        } catch (error) {
            debug(error);
            Response.error(res, new createError.InternalServerError("Error eliminando el producto"));
        }
    },
};