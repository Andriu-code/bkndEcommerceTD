const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

const { UserService } = require('./services')
const { Response } = require('../common/response')

module.exports.UserController = {
    getUsers: async (req, res) => {
        try {
            let users = await UserService.getAll();
            Response.success(res, 200, 'Users', users);
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UserService.getById(id);
            if (!user) {
                Response.error(res, new createError.NotFound())
            } else {
                Response.success(res, 200, `User ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await UserService.create(body);
                Response.success(res, 201, 'Usuario Creado', insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    updateUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const user = await UserService.update(id, body);
                Response.success(res, 201, `Usuario Actualizado ${id}`, body)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params; // Obtener el ID de los parámetros de la URL
            if (!id) {
                return Response.error(res, new createError.BadRequest("ID es requerido"));
            }
            const user = await UserService.deleteUser(id);

            if (!user) {
                // Si el usuario no se encuentra, devolvemos un error 404
                return Response.error(res, new createError.NotFound(`Usuario no encontrado con id: ${id}`));
            }
            Response.success(res, 200, `Usuario eliminado con id: ${id}`);

        } catch (error) {
            debug(error);
            Response.error(res, new createError.InternalServerError("Error eliminando el usuario"));
        }
    },
};