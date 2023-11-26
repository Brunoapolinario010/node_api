### Pré requisitos

- Node.js (https://nodejs.org/)
- npm (normalmente é instalado junto ao Node.js)

### Instalação

1. Clonar o repositório

```bash

git clone https://github.com/Brunoapolinario010/node_api.git
```

2. Entrar no diretório do projeto

```bash

cd node_api
```

3. Instalar as dependências

```bash

npm install
```

4. Criar um arquivo dotenv para variaveis:

Crie um arquivo `.env` no diretório raiz do projeto com o seguinte modelo:

```dotenv

PORT = 3200

DB_URL = postgresql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME

SALT_ROUNDS = 10

JWT_SECRET = supersecretjwt
```

- PORT: Define a porta em que o servidor da aplicação será executado.

- DB_URL: Contém as informações de conexão com o banco de dados PostgreSQL.

- SALT_ROUNDS: Determina o número de rounds para a criptografia de senhas.

- JWT_SECRET: É a chave secreta usada para assinar tokens JWT para autenticação.

5. Executar a api

```bash

npm start
```

## Utilização

Iniciar o servidor

```bash

npm start
```

Formatar o código

```bash

npm run lint
```

## Rotas da API

### Adicionar Usuário

Adiciona um novo usuário.

- **Método:** `POST`
- **Endpoint:** `/api/users`

### Obter Usuários

Obtém a lista de usuários. Autenticação é necessária.

- **Método:** `GET`
- **Endpoint:** `/api/users`
- **Autenticação:** Sim

### Obter Usuário por ID

Obtém informações de um usuário específico. Autenticação é necessária.

- **Método:** `GET`
- **Endpoint:** `/api/users/:id`
- **Parâmetros:**
  - `id`: Identificador único do usuário
- **Autenticação:** Sim
