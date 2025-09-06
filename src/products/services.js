const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const COLLECTION = 'products';

const getAll = async () => {   // traer todas las tareas
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();  //retorna toda la coleccion de tareas y lo muestra como un array
}

const getById = async (id) => {  //traer tarea por id
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id)
    return await collection.findOne({ _id: objectId });
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const update = async (id, product) => {
    const collection = await Database(COLLECTION);
    const { _id, ...updateData } = product;
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
}

const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.ProductService = {
    getAll,
    getById,
    create,
    update,
    deleteProduct
}