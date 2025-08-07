/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('casos').del();
  
  const agentes = await knex('agentes').select('id', 'nome');

  const mapaAgentes = agentes.reduce((mapa, agente) => {
      mapa[agente.nome] = agente.id;
      return mapa;
  }, {});

  await knex('casos').insert([
    {
      titulo: 'Caso do Rommel',
      descricao: 'Investigação complexa liderada por Rommel',
      status: 'aberto',
      agente_id: mapaAgentes['Rommel Carneiro'],
    },
    {
      titulo: 'Caso do Manoel',
      descricao: 'Investigação de operação irregular de curso de corte e costura',
      status: 'solucionado',
      agente_id: mapaAgentes['Manoel Pereira'],
    },
    {
      titulo: 'Caso do Marquinho',
      descricao: 'Investigação sobre barbearia clandestina na avenida Abilio Machado',
      status: 'aberto',
      agente_id: mapaAgentes['Marquinho Cabeleleiro'],
    },
  ]);
};