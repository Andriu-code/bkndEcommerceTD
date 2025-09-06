const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

const { CatalogService } = require('./services')
const { Response } = require('../common/response')

module.exports.CatalogController = {
    getTexts: async (req, res) => {
        try {
            let texts = await CatalogService.getAll();
            Response.success(res, 200, 'texts', texts);
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    getText: async (req, res) => {
        try {
            const { params: { id } } = req;
            let text = await CatalogService.getById(id);
            if (!text) {
                Response.error(res, new createError.NotFound())
            } else {
                Response.success(res, 200, `Text ${id}`, text);
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    createText: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await CatalogService.create(body);
                Response.success(res, 201, 'Texto creado', insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    updateText: async (req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const text = await CatalogService.update(id, body);
                Response.success(res, 201, `Text Actualizado ${id}`, body)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    deleteText: async (req, res) => {
        try {
            const { id } = req.params; // Obtener el ID de los parámetros de la URL
            if (!id) {
                return Response.error(res, new createError.BadRequest("ID es requerido"));
            }
            const text = await CatalogService.deleteText(id);

            if (!text) {
                // Si el text no se encuentra, devolvemos un error 404
                return Response.error(res, new createError.NotFound(`Texto no encontrado con id: ${id}`));
            }
            Response.success(res, 200, `Texto eliminado con id: ${id}`);

        } catch (error) {
            debug(error);
            Response.error(res, new createError.InternalServerError("Error eliminando el texto"));
        }
    },
};