[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#)
[![Deploy](https://img.shields.io/badge/Deploy-Render-blueviolet)](#)

# Login/Register Authentication Web Application (English)

An authentication system using Node.js and Express for the backend, PostgreSQL for the database.   
Users can register, log in, reset password via email, and access a protected dashboard with JWT stored in HttpOnly cookies.

## Features

- User Registration (sign up)
- Login with JWT authentication
- Password reset via email using Nodemailer
- Protected dashboard page accessible only after login
- JWT stored securely in HttpOnly cookies
- Passwords hashed with bcrypt

## Technologies

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication & Security: JWT, bcrypt, crypto, cookie-parser
- Email Service: Nodemailer
- Deployment: Render

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js(v25.4.0 or higher)
- PostgreSQL database
- Email account for password reset functionality (e.g., Gmail with App Passwords enabled)

## Deploy

https://mintpage-3qwv.onrender.com

## Project Structure

```
MintPage/
├── client/                          # Frontend (HTML, CSS, JS)
│   ├── private/                     # Protected pages (require authentication)
│   │   └── dashboard.html
│   │
│   ├── public/                      # Publicly accessible pages
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── forgot-password.html
│   │   ├── reset-password.html
│   │   ├── landing-page.html
│   │   └── images/                  # Static image assets
│   │
│   └── src/                         # Frontend source files
│       ├── config/                  # Frontend configuration
│       ├── services/                # API interaction logic
│       ├── styles/                  # CSS stylesheets
│       └── utils/                   # Helper functions (validation, loader, theme)
│
└── server/                          # Backend (Node.js + Express)
    ├── .env                         # Environment variables (not committed)
    └── src/
        ├── app.js                   # Express app configuration
        ├── server.js                # Server entry point
        │
        ├── config/                  # Database & mail configuration
        │   ├── db.js
        │   └── mailer.js
        │
        ├── controllers/             # Business logic
        ├── routes/                  # API route definitions
        ├── middleware/              # JWT authentication middleware
        └── utils/                   # Token generation utilities
```

## Installation

### 1. Clone the repository

```
git clone https://github.com/Gea73/MintPage.git
cd MintPage
```

### 2. Install dependencies:

```
npm install
```

### 3. Setup PostgreSQL database and create .env file:

```
#Database Config
DB_USER=Postgres database username
DB_HOST=Hostname ex:localhost
DB_NAME=Database Name
DB_PASS=Database Password
DB_PORT=Database Port
    
#Email Config To use reset password by email function
EMAIL_USER=Your email address
EMAIL_PASS=Your email app password (Not your real password)
    
#API    
API_URL= ex:http://localhost:5000
    
#Secret
JWT_SECRET=JWT secret
```

### 4. Run the server:

    npm start

### 5. Open your browser and go to:

    http://localhost:5000 (or the custom URL you have configured)


    

# Sistema de Autenticação Login/Cadastro (Português)

## Funcionalidades

- Cadastro de usuário
- Login com autenticação JWT
- Redefinição de senha via e-mail usando Nodemailer
- Página de dashboard protegida, acessível apenas após login
- JWT armazenado de forma segura em cookies HttpOnly
- Senhas criptografadas com bcrypt

## Tecnologias

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Banco de Dados: PostgreSQL
- Autenticação e Segurança: JWT, bcrypt, crypto, cookie-parser
- Serviço de Email: Nodemailer
- Deploy: Render

## Pré-Requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- Node.js(v25.4.0 ou superior)
- Banco de dados PostgreSQL
- Conta de e-mail para função de redefinição de senha (ex.: Gmail com App Password habilitado)

## Deploy

https://mintpage-3qwv.onrender.com

## Project Structure

```
MintPage/
├── client/                          # Frontend (HTML, CSS, JS)
│   ├── private/                     # Páginas protegidas (requer autenticação)
│   │   └── dashboard.html
│   │
│   ├── public/                      # Páginas de acesso Públicas 
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── forgot-password.html
│   │   ├── reset-password.html
│   │   ├── landing-page.html
│   │   └── images/                  # Imagens Estáticas
│   │
│   └── src/                         # Arquivos fonte Frontend 
│       ├── config/                  # Configuração Frontend 
│       ├── services/                # lógica de interação com APIs
│       ├── styles/                  # CSS stylesheets
│       └── utils/                   # Funções auxiliares (validação, carregamento, tema)
│
└── server/                          # Backend (Node.js + Express)
    ├── .env                         # Variáveis de ambiente (não committadas)
    └── src/
        ├── app.js                   # Configuração Express app
        ├── server.js                # Ponto de entrada do Server
        │
        ├── config/                  # Configuração de banco de dados e email
        │   ├── db.js
        │   └── mailer.js
        │
        ├── controllers/             # Lógica de négocio (controllers)
        ├── routes/                  # Rotas das API 
        ├── middleware/              # middleware de autenticação JWT
        └── utils/                   # Utilidades (Gerador de Token JWT)
```

## Instalação

### 1. Clonar o repositório

    git clone https://github.com/Gea73/MintPage.git
    cd MintPage

### 2. Instalar dependências

    npm install

### 3. Configurar banco de dados PostgreSQL e criar arquivo .env:

    # Configuração do banco de dados
    DB_USER=Seu usuário do PostgreSQL
    DB_HOST=Host do banco, ex: localhost
    DB_NAME=Nome do banco de dados
    DB_PASS=Senha do banco de dados
    DB_PORT=Porta do banco

    # Configuração de e-mail (para função de redefinição de senha)
    EMAIL_USER=Seu endereço de e-mail
    EMAIL_PASS=Senha do app de e-mail (não a senha real)

    # API
    API_URL=ex: http://localhost:5000

    # Secret
    JWT_SECRET=Segredo para JWT

### 4. Executar o servidor:

    npm start

### 5. Abra o navegador e acesse:

    http://localhost:5000 (Ou o url que você tenha configurado)



