## 📚 Biblioteca Comunitária
Um sistema simples, moderno e completo para gestão de livros, usuários e eventos comunitários.

Este projeto foi desenvolvido com o objetivo de facilitar a administração de uma biblioteca comunitária, centralizando informações e oferecendo uma interface intuitiva tanto para leitores quanto para administradores.

⭐ Sobre o Projeto
A Biblioteca Comunitária é uma aplicação fullstack composta por:

Backend: Node.js, Express, PostgreSQL, JWT, bcrypt

Frontend: React, Vite, Axios e React Router

Banco de Dados: PostgreSQL com autenticação segura e relações bem estruturadas

O sistema permite:

✔ Cadastro e login de usuários
✔ Perfis com diferentes permissões (leitor, administrador)
✔ Gerenciamento de livros (listar, criar, deletar)
✔ Gerenciamento de eventos da biblioteca
✔ Acesso ao perfil do usuário autenticado
✔ Tokens JWT com expiração e segurança
✔ Criptografia de senhas com bcrypt
✔ Requisições autenticadas pelo frontend

✨ Funcionalidades
👤 Autenticação
Cadastro de novos usuários

Login com validação

Geração de token JWT

Rotas protegidas

Perfis específicos (ex.: "admin" e "leitor")

📘 Módulo de Livros
Listagem

Cadastro

Exclusão

Visual atraente e responsiva

🗓 Módulo de Eventos
Criação de eventos

Listagem

Exclusão

👥 Perfil do Usuário
Exibe dados do usuário autenticado

Armazena token no localStorage

🛠 Tecnologias Utilizadas
🔹 Backend
Node.js

Express

PostgreSQL

JWT

bcryptjs

express-validator

dotenv

🔹 Frontend
React

Vite

Axios

React Router DOM

CSS Modules

🗂 Estrutura do Projeto
📦 Backend
backend/
 ├── controllers/
 │   └── authController.js
 ├── models/
 │   └── usuarioModel.js
 ├── routes/
 │   ├── authRoutes.js
 │   ├── livrosRoutes.js
 │   └── eventosRoutes.js
 ├── db/
 │   └── connection.js
 ├── server.js
 ├── .env
 └── package.json
💻 Frontend
frontend/
 ├── src/
 │   ├── pages/
 │   │   ├── Login.jsx
 │   │   ├── Livros.jsx
 │   │   ├── Eventos.jsx
 │   │   └── Profile.jsx
 │   ├── components/
 │   ├── services/
 │   │   ├── authService.js
 │   │   ├── livrosService.js
 │   │   └── eventosService.js
 │   └── styles/
 │       ├── login.css
 │       └── *.module.css
 ├── public/
 ├── index.html
 ├── vite.config.js
 └── package.json
🗄 Banco de Dados (PostgreSQL)
O banco foi criado com tabelas bem estruturadas, incluindo:

🧑‍💼 Tabela usuarios
id_usuario

nome

cpf

telefone

endereco

email

senha_hash

perfil

📚 Tabela livros
id_livro

titulo

autor

ano

categoria

🗓 Tabela eventos
id_evento

nome

data

descricao

🚀 Como Rodar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/biblioteca-comunitaria.git
cd biblioteca-comunitaria
🛠 Backend
2️⃣ Instalar dependências
cd backend
npm install
3️⃣ Criar arquivo .env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=biblioteca
DB_USER=postgres
DB_PASSWORD=senha_do_postgres
JWT_SECRET=sua_chave_super_secreta
4️⃣ Rodar o servidor
npm run dev
O backend estará em:
👉 http://localhost:3000

💻 Frontend
5️⃣ Instalar dependências
cd ../frontend
npm install
6️⃣ Rodar o frontend
npm run dev
Frontend disponível em:
👉 http://localhost:5173

🔐 Fluxo de Autenticação
Usuário faz login

Backend valida email + senha

Gera token JWT

Frontend armazena token e dados do usuário

Próximas requisições usam o token no header

Rotas protegidas só liberam acesso autenticado

🎨 Interface
O frontend foi construído com:

Layout limpo

Cores harmônicas

Componentes reutilizáveis

CSS Modules para isolamento

Responsividade


