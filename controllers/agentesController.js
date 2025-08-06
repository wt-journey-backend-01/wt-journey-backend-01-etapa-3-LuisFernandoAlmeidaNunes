const { json } = require("express");
const agentesRepository = require("../repositories/agentesRepository");
const errorHandler = require("../utils/errorHandler");
const { param } = require("../routes/agentesRoutes");

class ApiError extends Error {
    constructor(message, statusCode = 500){
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

async function getAllAgentes(req, res, next) {

    try {
        const agentes = await agentesRepository.findAll();
        return res.status(200).json({ agentes: agentes});


    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

async function getAgenteById(req, res, next) {
    let id;
    try {
        req.params.id = parseInt(req.params.id);
        id = errorHandler.idSchema.parse(req.params).id;
    } catch (error) {
        return next(new ApiError(error.message, 400));
    }

    try {
        const agente = await agentesRepository.findById(id);

        if (!agente) {
            return next(new ApiError("Agente não encontrado", 404));
        }

        return res.status(200).json({
            message: "Agente encontrado com sucesso!",
            agente: agente
        });
    } catch (error) {
        return next(new ApiError("Erro interno ao buscar agente: " + error.message, 500));
    }
}



function createAgente(req,res, next){
    let agenteData;
    try {
        agenteData = errorHandler.agenteSchema.parse(req.body); 
    
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }
    try {
        const agente = agentesRepository.create(agenteData);        
        return res.status(201).json({message: "Agente criado com sucesso !", agente: agente});
    } catch(error) {
        next(new ApiError(error.message, 404));
    }
}

function deleteAgenteById(req, res, next){
    let id;
    try {
        ({id} =errorHandler.agenteSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    try {
        deleted = agentesRepository.deleteById(id);
        return res.status(204).send();
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

function editAgente(req, res, next) {
    let id, dados;
    try {
        ({id} =errorHandler.agenteSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    try {
        dados = errorHandler.agenteSchema.parse(req.body);
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }
    try {
        const agente = agentesRepository.edit(id, dados);

        return res.status(200).json({message: "Agente editado com sucesso !", agente: agente});
    } catch(error) {
        next(new ApiError(error.message, 404));
    }
}

function editAgenteProperty(req, res, next){
    let id, dados;
    try{
        ({id} =errorHandler.agenteSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    try {
        dados = errorHandler.partialAgenteSchema.parse(req.body);
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }
    try{
        const agente = agentesRepository.editProperties(id, dados);
        return res.status(200).json({agente: agente});
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

module.exports = {
   getAllAgentes,
   getAgenteById,
   createAgente,
   deleteAgenteById,
   editAgente,
   editAgenteProperty
}