# Como rodar o projeto

## 1. Faça o clone do repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

## 2. Instale as dependências

```bash
pnpm i
```

## 3. Crie o arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
JWT_SECRET=hiperSecret
JWT_EXPIRATION_TIME=3600

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=task_management
```

Obs: Como este não é um projeto de produção, as variáveis já estão sendo fornecidas.

## 4. Suba o banco de dados com Docker

```bash
pnpm run docker:compose
```

Obs: É necessário ter o Docker Desktop instalado na sua máquina.

## 5. Teste a conexão com o banco de dados

Use algum gerenciador de banco de dados para testar a conexão com as credenciais contidas no arquivo .env.

Caso ocorra algum erro de privilégios, execute os seguintes comandos no terminal:

```bash
docker exec -it my-mysql bash
mysql -u root -p
```

Digite a senha: password

```bash
update mysql.user set host='%' where user='root';
FLUSH PRIVILEGES;
```

Obs: Caso o último comando apareça no terminal como FLUSHPRIVILEGES;, separe as palavras corretamente para FLUSH PRIVILEGES;.

## 6. Inicie o projeto

```bash
pnpm run start:debug
```

## 7. Ponto de partida

O ponto de partida é a rota de criação de empresa, ela já gera a empresa com o usuário `admin` e também pode ser gerado vários usuários `admin` e vários `user`. A partir disso é possível fazer o login.

## 6. Documentação

Entre no endereço `http://localhost:3000/api`
