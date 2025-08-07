/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

    await knex('agentes').del();

    await knex('agentes')
        .insert([
            { nome: 'Rommel Carneiro', dataDeIncorporacao: '1992-10-04', cargo: 'delegado' },
            { nome: 'Manoel Pereira', dataDeIncorporacao: '2002-11-05', cargo: 'investigador' },
            { nome: 'Marquinho Cabeleleiro', dataDeIncorporacao: '1996-01-14', cargo: 'investigador' },
        ]);

}