const { json } = require("express");
const agentesRepository = require("../repositories/agentesRepository");
const errorHandler = require("../utils/errorHandler");
const { da } = require("zod/locales");

async function getAllAgentes(req, res, next) {
        const agentes = await agentesRepository.findAll();

        if(!agentes){
            return next(new errorHandler.ApiError("Não foi possível resgatar registros", 500));
        }

        return res.status(200).json({ agentes: agentes});
}

async function getAgenteById(req, res, next) {
    
    let id;

    id = errorHandler.idSchema.parse(req.params).id;

    const agente = await agentesRepository.findById(id);

    if (!agente) {
        return next(new errorHandler.ApiError("Agente não encontrado nos registros", 404));
    }

    return res.status(200).json({
        message: "Agente encontrado com sucesso!",
        agente: agente
    });
}



async function createAgente(req,res, next){
    let agenteData;
        agenteData = await errorHandler.agenteSchema.parse(req.body);
    try {
        const agente = await agentesRepository.create(agenteData);        
        return res.status(201).json({message: "Agente criado com sucesso !", agente: agente});
    } catch(error) {
        next(new errorHandler.ApiError(error.message, 404));
    }
}

async function deleteAgenteById(req, res, next){
    let id;

    id = errorHandler.idSchema.parse(req.params).id;

    deleted = await agentesRepository.deleteById(id);

    if(!deleted){
        next(new errorHandler.ApiError("Não foi possível encontrar o agente nos registros ", 404));
    }

    return res.status(204).send();
}

async function editAgente(req, res, next) {
    let id, dados;

    id = errorHandler.idSchema.parse(req.params).id;
    dados = errorHandler.agenteSchema.parse(req.body);

    const agente = await agentesRepository.edit(id, dados);

    if(!agente){
        return next(new errorHandler.ApiError("Não foi possível atualizar os dados do agente", 404));
    }

    return res.status(200).json({message: "Agente editado com sucesso !", agente: agente});
}

async function editAgenteProperty(req, res, next){
    
    let id, dados;

    id = errorHandler.idSchema.parse(req.params).id;
    dados = errorHandler.partialAgenteSchema.parse(req.body);

    if(Object.keys(dados).length === 0 ){
        return next(new errorHandler.ApiError("Não foi possível atualizar as propriedades do agente pois não foram enviados dados !", 400));
    }

    const agente = await agentesRepository.edit(id, dados);

    if(!agente){
        return next(new errorHandler.ApiError("Não foi possível atualizar as propriedades do agente", 404));
    }

    return res.status(200).json({agente: agente});
}

module.exports = {
   getAllAgentes,
   getAgenteById,
   createAgente,
   deleteAgenteById,
   editAgente,
   editAgenteProperty
}