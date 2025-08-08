const db = require("../db/db");

async function create(obj) {
    const created = await db("agentes").insert(obj,["*"]);

    if (!created){
        return false;
    }

    return created;
}

async function findAll() {
    const agentes = await db("agentes").select("*");

    if(!agentes){
        return false;
    }

    return agentes;
}

async function findById(id) {


    const agente = await db("agentes").where({id:id}).first();

    if(!agente){
        return false;
    }

    return agente;
}

async function deleteById(id) {

    const deleted = await db("agentes").where({id:id}).del();
  
    if(!deleted){
        return false;
    }

    return deleted;

}

async function edit(id, agenteData){

    const agente = await db('agentes').where({id:id}).update(agenteData,["*"]);

    if (!agente) {
        return false; 
    }

    return agente;
}

module.exports = {
    findAll,
    findById,
    create,
    edit,
    deleteById
}