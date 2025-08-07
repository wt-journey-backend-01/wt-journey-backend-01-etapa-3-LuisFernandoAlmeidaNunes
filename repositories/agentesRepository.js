const db = require("../db/db");

async function create(obj) {
    try {
        
        const created = await db("agentes").insert(obj,["*"]);

        return created;

    } catch (error) {
        throw new Error(`Não foi possível criar o agente !`);
    }
}

async function findAll() {
    try {
        
        const agentes = await db("agentes").select("*");

        return agentes;

    } catch (error) {
        throw new Error(`Não foi possível encontrar os registros !`);
    }
}

async function findById(id) {


    const agente = await db("agentes").where({id:id}).first();

    if(!agente){
        throw new Error(`Agente não encontrado`);
    }

    return agente;
}

// ------ sem persistencia ------ //

function edit(id, agenteData){
    
    agenteToEditIndex = agentes.findIndex(agente => agente.id === id);

    if(agenteToEditIndex === -1) {
        throw new Error(`Id ${id} não encontrado !`);
    }

    agentes[agenteToEditIndex].id = id;
    agentes[agenteToEditIndex].nome = agenteData.nome;
    agentes[agenteToEditIndex].dataDeIncorporacao = agenteData.dataDeIncorporacao;
    agentes[agenteToEditIndex].cargo = agenteData.cargo;

    return agentes[agenteToEditIndex];

}

function editProperties(id, dataForPatch){
    
    indexAgente = agentes.findIndex(agente => agente.id === id)
    
    if ( indexAgente === -1){
        throw new Error(`Id ${id} não encontrado !`);
    }

    const {nome, dataDeIncorporacao, cargo} = dataForPatch;
    
    if ( nome !== undefined && nome !== "") agentes[indexAgente].nome = nome;
    if ( dataDeIncorporacao !== undefined && dataDeIncorporacao !== "") agentes[indexAgente].dataDeIncorporacao = dataDeIncorporacao;
    if ( cargo !== undefined && cargo !== "") agentes[indexAgente].cargo = cargo;

    return agentes[indexAgente]

}

function deleteById(id) {
  const index = agentes.findIndex(agente => agente.id === id);

  if (index !== -1) {
    const agente = agentes.splice(index, 1);
    return agente;
    }
    
    throw new Error(`Id ${id} não encontrado !`);
}

module.exports = {
    findAll,
    findById,
    create,
    edit,
    deleteById,
    editProperties
}