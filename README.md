# StyleStock — Sistema de Cadastro de Roupas 2026

Projeto didatico full-stack para cadastro e controle de estoque de roupas de uma loja.

- **Backend:** Spring Boot + Java + H2
- **Frontend:** React + Vite + Axios + React Router

---

## Estrutura do projeto

```
Sistema Cadastro trabalho/
├── backend/                          ← API REST (Spring Boot)
│   ├── pom.xml                       ← Dependencias Maven
│   ├── exemplos-postman.json         ← JSONs para testar no Postman
│   └── src/main/
│       ├── java/com/stylestock/
│       │   ├── StyleStockApplication.java   ← Classe principal
│       │   ├── config/
│       │   │   └── CorsConfig.java          ← Permite acesso do React
│       │   ├── controller/
│       │   │   └── RoupaController.java     ← Endpoints REST
│       │   ├── entity/
│       │   │   └── Roupa.java               ← Modelo do banco
│       │   ├── repository/
│       │   │   └── RoupaRepository.java     ← Acesso ao banco
│       │   └── service/
│       │       └── RoupaService.java        ← Regras de negocio
│       └── resources/
│           ├── application.properties       ← Configuracoes
│           └── data.sql                     ← Dados iniciais
│
└── frontend/                         ← Interface (React)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx                  ← Entrada do React
        ├── App.jsx                   ← Componente principal
        ├── App.css                   ← Estilos globais
        ├── index.css                 ← Reset CSS
        ├── components/
        │   ├── Navbar.jsx            ← Menu de navegacao
        │   └── Navbar.css
        ├── pages/
        │   ├── Home.jsx              ← Pagina inicial
        │   ├── ListagemRoupas.jsx    ← Lista todas as roupas
        │   ├── CadastroRoupa.jsx     ← Formulario de cadastro
        │   ├── EdicaoRoupa.jsx       ← Formulario de edicao
        │   └── BuscaRoupa.jsx        ← Busca por nome ou ID
        ├── routes/
        │   └── AppRoutes.jsx         ← Rotas do React Router
        └── services/
            ├── api.js                ← Configuracao do Axios
            └── roupasService.js      ← Funcoes que chamam a API
```

---

## Pre-requisitos

Instale antes de comecar:

| Ferramenta | Versao minima | Para que serve |
|------------|---------------|----------------|
| **Java JDK** | 17 | Rodar o backend Spring Boot |
| **Maven** | 3.8+ | Gerenciar dependencias do backend |
| **Node.js** | 18+ | Rodar o frontend React |
| **npm** | 9+ | Instalar pacotes do frontend |

Verifique se estao instalados:

```bash
java -version
mvn -version
node -v
npm -v
```

> **Dica:** Se o comando `mvn` nao for reconhecido, voce tambem pode abrir a pasta `backend` no **IntelliJ IDEA**, **Eclipse** ou **VS Code** (com extensao Spring Boot) e executar a classe `StyleStockApplication.java` diretamente pelo botao Run.

---

## Como rodar o BACKEND

### Passo 1 — Entre na pasta do backend

```bash
cd backend
```

### Passo 2 — Baixe as dependencias e inicie o servidor

```bash
mvn spring-boot:run
```

Aguarde aparecer no terminal algo como:

```
Started StyleStockApplication in X seconds
```

O backend estara rodando em: **http://localhost:8080**

### Passo 3 — Teste no navegador

Abra: **http://localhost:8080/roupas**

Voce deve ver um JSON com 8 roupas de exemplo.

### Console do banco H2 (opcional)

- URL: **http://localhost:8080/h2-console**
- JDBC URL: `jdbc:h2:mem:stylestockdb`
- Usuario: `sa`
- Senha: *(deixe em branco)*

---

## Como rodar o FRONTEND

Abra um **novo terminal** (mantenha o backend rodando).

### Passo 1 — Entre na pasta do frontend

```bash
cd frontend
```

### Passo 2 — Instale as dependencias (so na primeira vez)

```bash
npm install
```

### Passo 3 — Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estara em: **http://localhost:5173**

---

## Endpoints da API REST

| Metodo | URL | Descricao |
|--------|-----|-----------|
| GET | `/roupas` | Listar todas as roupas |
| GET | `/roupas/{id}` | Buscar roupa por ID |
| GET | `/roupas/buscar?nome=camiseta` | Buscar por nome |
| POST | `/roupas` | Cadastrar nova roupa |
| PUT | `/roupas/{id}` | Editar roupa existente |
| DELETE | `/roupas/{id}` | Excluir roupa |

---

## Exemplos JSON para Postman / Insomnia

Arquivo completo: `backend/exemplos-postman.json`

### Cadastrar roupa (POST /roupas)

```json
{
  "nome": "Blusa de Trico Creme",
  "categoria": "Camiseta",
  "tamanho": "G",
  "cor": "Creme",
  "preco": 89.90,
  "quantidade": 14,
  "descricao": "Blusa de trico macia para dias mais frios."
}
```

### Editar roupa (PUT /roupas/1)

```json
{
  "nome": "Camiseta Basica Rosa Premium",
  "categoria": "Camiseta",
  "tamanho": "M",
  "cor": "Rosa",
  "preco": 54.90,
  "quantidade": 30,
  "descricao": "Camiseta premium de algodao organico."
}
```

---

## Como testar a integracao

1. Inicie o **backend** (`mvn spring-boot:run` na pasta `backend`)
2. Inicie o **frontend** (`npm run dev` na pasta `frontend`)
3. Acesse **http://localhost:5173**
4. Teste cada funcionalidade:

| Acao | O que verificar |
|------|-----------------|
| Pagina **Roupas** | Deve listar 8 roupas de exemplo |
| **Cadastrar** | Preencha o formulario e salve — a roupa aparece na listagem |
| **Editar** | Clique em Editar num card, altere dados e salve |
| **Excluir** | Clique em Excluir e confirme — o card some |
| **Buscar** | Digite "camiseta" ou "1" e veja o resultado |

Se aparecer erro de conexao, confirme que o backend esta rodando na porta 8080.

---

## Rotas do Frontend

| Rota | Pagina |
|------|--------|
| `/` | Pagina inicial |
| `/roupas` | Listagem de roupas |
| `/cadastro` | Cadastro de roupa |
| `/editar/:id` | Edicao de roupa |
| `/buscar` | Busca por nome ou ID |

---

## Camadas do Backend (explicacao)

```
Controller  →  recebe requisicoes HTTP (GET, POST, PUT, DELETE)
     ↓
Service     →  contem a logica de negocio
     ↓
Repository  →  acessa o banco de dados
     ↓
Entity      →  representa a tabela "roupas" no banco
```

---

## Tecnologias utilizadas

**Backend:** Spring Boot 3, Spring Data JPA, H2 Database, Maven

**Frontend:** React 18, Vite, Axios, React Router DOM 6

---

## Autora / Atividade

Projeto desenvolvido como atividade pratica de integracao frontend + backend.

**StyleStock © 2026**
