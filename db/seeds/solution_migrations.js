/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Limpa as tabelas
  await knex('casos').del();
  await knex('agentes').del();

  // Insere os agentes e captura os IDs retornados
  const agentesInseridos = await knex('agentes')
    .insert([
      { nome: 'Rommel Carneiro', dataDeIncorporacao: '1992-10-04', cargo: 'delegado' },
      { nome: 'Manoel Pereira', dataDeIncorporacao: '2002-11-05', cargo: 'investigador' },
      { nome: 'Marquinho Cabeleleiro', dataDeIncorporacao: '1996-01-14', cargo: 'investigador' },
    ])
    .returning(['id', 'nome']);

  // Cria um map para facilitar a associação
  const mapaAgentes = Object.fromEntries(
    agentesInseridos.map(a => [a.nome, a.id])
  );

  // Insere os casos usando os IDs obtidos
  await knex('casos').insert([
    {
      titulo: 'Caso do Rommel',
      descricao: 'Investigação complexa liderada por Rommel',
      status: 'aberto',
      agente_id: mapaAgentes['Rommel Carneiro'],
    },
    {
      titulo: 'Caso do Manoel',
      descricao: 'Investigação de furto',
      status: 'solucionado',
      agente_id: mapaAgentes['Manoel Pereira'],
    },
    {
      titulo: 'Caso do Marquinho',
      descricao: 'Investigação sobre barbearia clandestina',
      status: 'aberto',
      agente_id: mapaAgentes['Marquinho Cabeleleiro'],
    },
  ]);
};
