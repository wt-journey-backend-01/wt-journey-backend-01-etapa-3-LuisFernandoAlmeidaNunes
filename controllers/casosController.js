const { json } = require("express");
const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const errorHandler = require("../utils/errorHandler");

async function getAllCasos(req, res, next) {

    try{

    // const {agente_id, status} = req.query;

        let casos = await casosRepository.findAll();

        if(casos.length === 0){        
            return res.status(200).json({message: "Não há casos registrados ainda", casos: casos});
        }

    // if(agente_id){
    //     const validatedUuid = errorHandler.idSchema.parse({id: agente_id});
    //     const agenteExists = await agentesRepository.findById(validatedUuid.id);
    //     const casos = casosRepository.findByAgente(agenteExists.id);
    //     if(casos){
    //         return res.status(200).json({casos: casos});
    //     }
    // }
    
    // if(status){
    //     if(status === "aberto" || status === "solucionado" ){
    //         casos = casos.filter(caso => caso.status === status);
    //     } else {
    //         return next(new ApiError('Apenas é possível pesquisar por "aberto" ou "solucionado"', 400));
    //     }
    // }

        return res.status(200).json(casos);
    
    }catch(error){
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
    }
}

// function getCasosByWord(req, res, next){
//     const {q} = req.query;

//     console.log(q);
    
//     if (!q) {
//         return next(new ApiError("Parâmetro 'q' é obrigatório para busca.", 400));
//     }

//     const casos = casosRepository.findByWord(q);
    
//     return res.status(200).json({casos: casos});
// }

// function getCasoByAgente(id, res, next) {

//     const agenteExists = await agentesRepository.findById(id);

//     if(!agenteExists){
//         return next(new ApiError(error.message, 404));
//     }

//     try {
//         const caso = casosRepository.findByAgente(id);
//         return res.status(200).json(caso);
//     } catch(error) {
//         return next(new ApiError(error.message, 404));
//     }
// }

// function getAgenteDataByCasoId(req, res, next){
//     const { caso_id } = req.params;
//     let validCasoId;
//     try {
//         validCasoId = errorHandler.idSchema.parse({ id: caso_id });
//     } catch(error) {
//         return next(new ApiError(error.message, 400));
//     }

//     let caso;
//     try {
//         caso = casosRepository.findById(validCasoId.id);
//     } catch(error) {
//         return next(new ApiError(error.message, 404));
//     }

//     try {
//         const agente = await agentesRepository.findById(caso.agente_id);
//         return res.status(200).json({ agente });
//     } catch(error) {
//         return next(new ApiError(error.message, 404));
//     }
// }

// function getCasoAberto(status, casos, res, next){

//     if (status !== "aberto"){
//         return next(new ApiError('O filtro deve ocorrer por "Aberto"', 400));
//     }

//     if (!Array.isArray(casos)) {
//         throw new Error(error.message, 400);
//     }

//     const casosAbertos = casosRepository.findAberto(casos);    

//     return res.status(200).json(casosAbertos);

// }

async function getCasoById(req, res, next) {

    try{

        const id = errorHandler.idSchema.parse(req.params).id;
        
        const caso = await casosRepository.findById(id);

        if(!caso){
            return next(new errorHandler.ApiError("Não foi possível encontrar o caso !", 404));
        }

        return res.status(200).json(caso);

    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return next(new errorHandler.ApiError(errorMessages.join(', '), 400));
        }
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
    }
}


async function createCaso(req, res, next){

    try{

        const dados = errorHandler.casoSchema.parse(req.body);
        
        const agente = await agentesRepository.findById(dados.agente_id);

        if(!agente){
            return next(new errorHandler.ApiError("Agente inexistente !", 404));
        }

        const caso = await casosRepository.create(dados);

        if(!caso){
            return next(new errorHandler.ApiError("Não foi possível criar o caso !", 404));
        }

        return res.status(201).json({caso: caso});

    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return next(new errorHandler.ApiError(errorMessages.join(', '), 400));
        }
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
    }
}

async function deleteCasoById(req, res, next){

    try{

        const id = errorHandler.idSchema.parse(req.params).id;

        const caso = await casosRepository.deleteById(id);
        
        if(!caso){
            return next(new errorHandler.ApiError("Não foi possível encontrar o caso !", 404));
        }
        
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

async function editCaso(req, res, next) {

    try{
        const id = errorHandler.idSchema.parse(req.params).id;    
        const dados = errorHandler.casoSchema.parse(req.body);

        const caso = await casosRepository.edit(id, dados);

        if(!caso){
            return next(new errorHandler.ApiError("Não foi possível encontrar o caso !", 404));
        }

        return res.status(200).json({message: "Caso editado com sucesso !", caso: caso});

    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return next(new errorHandler.ApiError(errorMessages.join(', '), 400));
        }
        console.error("Erro inesperado na criação do agente:", error);
        return next(new errorHandler.ApiError("Ocorreu um erro no servidor.", 500));
    }
}

async function editCasoProperty(req, res, next){
    try{
        
        const id = errorHandler.idSchema.parse(req.params).id;
        const dados = errorHandler.partialCasoSchema.parse(req.body);

        if(Object.keys(dados).length === 0 ){
            return next(new errorHandler.ApiError("Não foi possível atualizar as propriedades do agente pois não foram enviados dados !", 400));
        }

        const caso = await casosRepository.edit(id, dados);

        if(!caso){
            return next(new errorHandler.ApiError("Não foi possível atualizar as propriedades do agente", 404));
        }

        return res.status(200).json({caso: caso});
    
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
   getAllCasos,
   getCasoById,
//    getCasoByAgente,
//    getAgenteDataByCasoId,
//    getCasoAberto,
//    getCasosByWord,
   createCaso,
   deleteCasoById,
   editCaso,
   editCasoProperty
}