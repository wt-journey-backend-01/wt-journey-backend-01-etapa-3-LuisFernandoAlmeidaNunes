Para subir o banco primeiramente a aplicação docker deve estar rodando.

configure um arquivo .env com as seguintes variaveis:

  1. POSTGRES_USER=postgres
  
  2. POSTGRES_PASSWORD=postgres
  
  3. POSTGRES_DB=policia_db
  
  4. DB_PORT=numero_da_porta

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

para iniciar o servidor:

  1. npm start

o servidor roda com a flag --watch, demais configurações podem ser incuidas no script start do arquivo <package.json>
  