const createError = require('http-errors');
const debug = require('debug')('app:module-orders-controller');

const { OrderService } = require('./services')
const { Response } = require('../common/response')

module.exports.OrderController = {
    getOrders: async (req, res) => {
        try {
            let orders = await OrderService.getAll();
            Response.success(res, 200, 'Orders', orders);
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    getOrder: async (req, res) => {
        try {
            const { params: { id } } = req;
            let order = await OrderService.getById(id);
            if (!order) {
                Response.error(res, new createError.NotFound())
            } else {
                Response.success(res, 200, `Order ${id}`, order);
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    createOrder: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await OrderService.create(body);
                Response.success(res, 201, 'Orden creada', insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    updateOrder: async (req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const order = await OrderService.update(id, body);
                Response.success(res, 201, `Orden Actualizada ${id}`, body)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params; // Obtener el ID de los parámetros de la URL
            if (!id) {
                return Response.error(res, new createError.BadRequest("ID es requerido"));
            }
            const order = await OrderService.deleteOrder(id);

            if (!order) {
                // Si la orden no se encuentra, devolvemos un error 404
                return Response.error(res, new createError.NotFound(`Orden no encontrada con id: ${id}`));
            }
            Response.success(res, 200, `Orden eliminada con id: ${id}`);

        } catch (error) {
            debug(error);
            Response.error(res, new createError.InternalServerError("Error eliminando la orden"));
        }
    },
};