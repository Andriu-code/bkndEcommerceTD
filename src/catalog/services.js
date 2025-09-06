const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const COLLECTION = 'catalog';

const getAll = async () => {   // traer todos los textos
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();  //retorna todos los textos
}

const getById = async (id) => {  //traer texto por id
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id)
    return await collection.findOne({ _id: objectId });
}

const create = async (product) => {  // crear texto
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const update = async (id, product) => {  //actualizar informacion de texto
    const collection = await Database(COLLECTION);
    const { _id, ...updateData } = product;
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
}

const deleteText = async (id) => {  // eliminar usuario
    const collection = await Database(COLLECTION);
    return collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.CatalogService = {
    getAll,
    getById,
    create,
    update,
    deleteText
}