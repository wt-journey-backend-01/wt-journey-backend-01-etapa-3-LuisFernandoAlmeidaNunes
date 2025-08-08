const { z } = require('zod');

const idSchema = z.object({
  id: z.coerce.number({required_error: 'Id é obrigatório'}).int({invalid_type_error: 'O id deve ser um numero inteiro'}).positive({invalid_type_error: 'O id deve ser um numero inteiro positivo'})
});

const casoSchema = z.object({
    titulo: z.string({ required_error: 'Titulo é obrigatório.'}).min(1, 'Nome não pode ser vazio.'),
    descricao: z.string({ required_error: 'Descrição é obrigatória.'}).min(1, 'Descrição não pode ser vazia.'),
    status: z.enum(['aberto', 'solucionado'], {
        required_error: 'Status é obrigatório.',
        invalid_type_error: 'Status deve ser "aberto" ou "solucionado".'
    }),
    agente_id: z.coerce.number({required_error: 'Id é obrigatório'}).int({invalid_type_error: 'O id deve ser um numero inteiro'}).positive({invalid_type_error: 'O id deve ser um numero inteiro positivo'})
});

const agenteSchema = z.object({
    nome: z.string({ required_error: 'Nome é obrigatório.' }).min(1, 'Nome não pode ser vazio.'),

      dataDeIncorporacao: z.string({ required_error: 'Data de incorporação é obrigatória.' })
                           .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),

    cargo: z.enum(['inspetor', 'delegado'], {
        required_error: 'Cargo é obrigatório.',
        invalid_type_error: 'Cargo deve ser "inspetor" ou "delegado".'
    }),
});     

const partialAgenteSchema = agenteSchema.partial();

const partialCasoSchema = casoSchema.partial();

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

function errorHandler(err, req, res, next) {
  // Se for erro de validação (Zod ou similar)
  if (err.details && Array.isArray(err.details)) {
    const messages = err.details.map((detail) => detail.message);
    return res.status(400).json({ error: messages });
  }

  // Se for erro do Zod
  if (err.issues && Array.isArray(err.issues)) {
    const messages = err.issues.map((issue) => issue.message);
    return res.status(400).json({ error: messages });
  }

  // Se for erro do Zod diretamente
  if (err.name === 'ZodError') {
    const messages = err.errors.map((e) => e.message);
    return res.status(400).json({ error: messages });
  }

  // Qualquer outro erro genérico
  return res.status(500).json({
    error: 'Erro interno no servidor',
    message: err.message,
  });
}

module.exports = {
    errorHandler,
    ApiError,
    casoSchema,
    agenteSchema,
    idSchema,
    partialAgenteSchema,
    partialCasoSchema
}