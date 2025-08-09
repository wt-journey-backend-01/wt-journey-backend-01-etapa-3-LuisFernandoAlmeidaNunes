const { json } = require("express");
const {z} = require("zod");
const agentesRepository = require("../repositories/agentesRepository");
const errorHandler = require("../utils/errorHandler");

async function getAllAgentes(req, res, next) {
    try {
        const agentes = await agentesRepository.findAll();

        if(agentes.length === 0){
            return res.status(200).json({message: 'Não existem agentes nos registros',agentes: agentes });
        }

        return res.status(200).json({ agentes: agentes });

    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return next(new errorHandler.ApiError(errorMessages.join(', '), 400));
        }
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
    }
}

async function getAgenteById(req, res, next) {
    
    try{
        const id = errorHandler.idSchema.parse(req.params).id;

        const agente = await agentesRepository.findById(id);

        return res.status(200).json({
            message: "Agente encontrado com sucesso!",
            agente: agente
        });

    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return next(new errorHandler.ApiError(errorMessages.join(', '), 400));
        }
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
    }
}



async function createAgente(req,res, next){
    try{
        const agenteData = await errorHandler.agenteSchema.parse(req.body);

        const agente = await agentesRepository.create(agenteData);        

        return res.status(201).json({message: "Agente criado com sucesso !", agente: agente});
    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return next(new errorHandler.ApiError(errorMessages.join(', '), 400));
        }
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
    }
}

async function deleteAgenteById(req, res, next){
    try{
        const id = errorHandler.idSchema.parse(req.params).id;

        deleted = await agentesRepository.deleteById(id);

        return res.status(204).send();

    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return next(new errorHandler.ApiError(errorMessages.join(', '), 400));
        }
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
    }
}

async function editAgente(req, res, next) {
    try{
        const id = errorHandler.idSchema.parse(req.params).id;
        const dados = errorHandler.agenteSchema.parse(req.body);

        const agente = await agentesRepository.edit(id, dados);

        return res.status(200).json({message: "Agente editado com sucesso !", agente: agente});
    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return next(new errorHandler.ApiError(errorMessages.join(', '), 400));
        }
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
    }
}

async function editAgenteProperty(req, res, next){
    try{
        const id = errorHandler.idSchema.parse(req.params).id;
        const dados = errorHandler.partialAgenteSchema.parse(req.body);

        if(Object.keys(dados).length === 0 ){
            return next(new errorHandler.ApiError("Não foi possível atualizar as propriedades do agente pois não foram enviados dados !", 400));
        }

        const agente = await agentesRepository.edit(id, dados);

        return res.status(200).json({agente: agente});
    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return next(new errorHandler.ApiError(errorMessages.join(', '), 400));
        }
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
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