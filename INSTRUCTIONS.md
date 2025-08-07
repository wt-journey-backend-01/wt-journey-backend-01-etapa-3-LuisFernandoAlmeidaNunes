Para subir o banco primeiramente a aplicação docker deve estar rodando.

em seguida no terminal na raiz do projeto é necessário rodar os seguintes comandos.

  1. docker-compose up -d

  2. npx knex migrate:latest

  3. npx knex seed:run

Ao finalizar os passos anteriores é possível pelo terminal conferir os dados criados, para isso é preciso executar:

docker exec -it <nome-do-container> psql -U <seu_usuario_docker> -d <nome_do_seu_banco_de_dados>

para conferir os dados inseridos e tabelas criadas, simples comandos sql são suficientes, como:

  1. \dt - para exibir as tabelas do banco

  2. SELECT * FROM <nome_da_sua_tabela>

quando for necessário finalizar as aplicações.

  1. docker-compose down - adicione a flag -v para excluir os registros se quiser
  