const db = require("../db/db");

async function findAll() {
    
    const casos = await db('casos').select('*');
    
    if(casos.length === 0){
        return false;
    }

    return casos;
}

async function findById(id){

    const caso = await db('casos').where({id:id}).first();

    if(!caso){
        return false;
    }

    return caso;
}

async function findByAgente(id){

    const casos = await db('casos').where({agente_id:id});

    if( casos.length === 0){
        return false;
    }

    return casos;

}

// function findAberto(casos) {
    
//     if (!Array.isArray(casos)) {
//         throw new Error("A entrada 'casos' deve ser um array.");
//     }
    
//     return casos.filter(caso => caso.status === "aberto");

// }

// function findByWord(q){

//     const term = q.toLowerCase();

//     return findAll().filter( caso => caso.titulo.toLowerCase().includes(term) || 
//                                       caso.descricao.toLowerCase().includes(term));

// }

async function create(obj){

    const created = await db("casos").insert(obj,["*"]);

    if (!created){
        return false;
    }

    return created;

}


async function edit(id, casoData){

    const caso = await db('casos').where({id:id}).update(casoData,["*"]);

    if (!caso) {
        return false; 
    }

    return caso;
}

async function deleteById(id) {

    console.log(typeof(id))

    const deleted = await db("casos").where({id:id}).del();
  
    if(!deleted){
        return false;
    }

    return deleted;

}

module.exports = {
    findAll,
    findById,
    findByAgente,
    // findAberto,
    // findByWord,
    create,
    edit,
    deleteById,
    // editProperties
}