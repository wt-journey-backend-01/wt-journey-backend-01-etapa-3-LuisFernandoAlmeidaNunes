const { z } = require('zod');

const idSchema = z.object({
  id: z.number().int().positive()
});

const casoSchema = z.object({
    titulo: z.string({ required_error: 'Titulo é obrigatório.'}).min(1, 'Nome não pode ser vazio.'),
    descricao: z.string({ required_error: 'Descrição é obrigatória.'}).min(1, 'Descrição não pode ser vazia.'),
    status: z.enum(['aberto', 'solucionado'], {
        required_error: 'Status é obrigatório.',
        invalid_type_error: 'Status deve ser "aberto" ou "solucionado".'
    }),
    agente_id: idSchema
});
const agenteSchema = z.object({
    nome: z.string({ required_error: 'Nome é obrigatório.' }).min(1, 'Nome não pode ser vazio.'),

    dataDeIncorporacao: z.string({ required_error: 'Data de incorporação é obrigatória.' }).regex(/^\d{4}\/\d{2}\/\d{2}$/, 'Data deve estar no formato YYYY/MM/DD'),

    cargo: z.enum(['inspetor', 'delegado'], {
        required_error: 'Cargo é obrigatório.',
        invalid_type_error: 'Cargo deve ser "inspetor" ou "delegado".'
    }),
});     

const partialAgenteSchema = agenteSchema.partial();

const partialCasoSchema = casoSchema.partial();

function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        // Tratamento de erros lançados manualmente
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message
        });
    }

    if (err.name === 'ZodError') {
        // Erro de validação do Zod
        const errors = {};
        err.errors.forEach((e) => {
            const path = e.path.join('.');
            errors[path] = e.message;
        });

        return res.status(400).json({
            status: 400,
            message: 'Parâmetros inválidos',
            errors: errors
        });
    }

    // Erro genérico (não tratado)
    return res.status(500).json({
        status: 500,
        message: 'Erro interno do servidor',
        errors: err.message || 'Erro desconhecido'
    });
}

module.exports = {
    errorHandler,
    casoSchema,
    agenteSchema,
    idSchema,
    partialAgenteSchema,
    partialCasoSchema
}