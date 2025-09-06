const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const COLLECTION = 'users';

const getAll = async () => {   // traer todos los usuarios
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();  //retorna todos los usuarios
}

const getById = async (id) => {  //traer usuario por id
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id)
    return await collection.findOne({ _id: objectId });
}

const create = async (product) => {  // crear usuario
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const update = async (id, product) => {  //actualizar informacion de usuario
    const collection = await Database(COLLECTION);
    const { _id, ...updateData } = product;
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
}

const deleteUser = async (id) => {  // eliminar usuario
    const collection = await Database(COLLECTION);
    return collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.UserService = {
    getAll,
    getById,
    create,
    update,
    deleteUser
}