# 🍽️ API de Restaurante

Uma API REST para gerenciamento de pedidos em um restaurante, desenvolvida com TypeScript, Node.js, Zod, Knex e SQLite. Os testes foram realizados utilizando o Insomnia.

## 🚀 Tecnologias

- 🟦 **TypeScript**: Tipagem estática para maior segurança e produtividade.
- 🟢 **Node.js**: Plataforma para execução de código JavaScript no lado do servidor.
- 📚 **Zod**: Validação de esquemas de dados de forma declarativa.
- 🗄️ **Knex**: Query builder para facilitar a interação com o banco de dados.
- 🗃️ **SQLite**: Banco de dados leve e eficiente.
- 🔍 **Insomnia**: Ferramenta para testar e documentar as requisições da API.

## 📊 Rotas da API

### 🛒 **Pedidos (Orders)**

- **`GET /orders/session_table/:id`**: Lista os pedidos de uma mesa.
- **`GET /orders/session_table/:id/total`**: Mostra o total dos pedidos de uma mesa.
- **`POST /orders`**: Cria um novo pedido.

### 🍴 **Sessões de Mesa (Table Sessions)**

- **`GET /table-sessions`**: Lista todas as sessões de mesa abertas.
- **`POST /table-sessions`**: Abre uma nova sessão de mesa.
- **`PATCH /table-sessions/:id`**: Encerra uma sessão de mesa.

### 📋 **Mesas (Tables)**

- **`GET /tables`**: Lista todas as mesas disponíveis.

### 🛍️ **Produtos (Products)**

- **`GET /products`**: Lista todos os produtos.
- **`POST /products`**: Cria um novo produto.
- **`PUT /products/:id`**: Atualiza um produto existente.
- **`DELETE /products/:id`**: Deleta um produto.

## 🧑‍💻 Como Executar

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd api-restaurante
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados:

```bash
npx knex migrate:latest
```

4. Inicie o servidor:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## ✅ Requisitos

- Node.js 18+
- SQLite instalado

## 📌 Notas

- Utilize o Insomnia para testar as rotas e validar os endpoints.

🎯 **Contribuições são bem-vindas!**
🚀 **Professor Rodrigo Gonçalves**
