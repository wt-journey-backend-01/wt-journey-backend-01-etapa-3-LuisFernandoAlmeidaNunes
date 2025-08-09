const db = require("../db/db");

async function create(obj) {
    const [created] = await db("agentes").insert(obj,["*"]);

    return created;
}

async function findAll() {
    const agentes = await db("agentes").select("*");
    return agentes;
}

async function findById(id) {

    const agente = await db("agentes").where({id:id}).first();

    return agente;
}

async function deleteById(id) {

    const deleted = await db("agentes").where({id:id}).del();

    return deleted;

}

async function edit(id, agenteData){

    const [agente] = await db('agentes').where({id:id}).update(agenteData,["*"]);

    return agente;
}

module.exports = {
    findAll,
    findById,
    create,
    edit,
    deleteById
}