# StyleStock — Sistema de Cadastro de Roupas

Projeto desenvolvido para a Atividade Prática – Sistema de Cadastro de Produtos 2026.

O StyleStock é um sistema de cadastro e controle de estoque de roupas, com frontend em React e backend em Spring Boot. O sistema permite cadastrar, listar, buscar, editar e excluir roupas, integrando a interface web com uma API REST e banco de dados H2.

## Tecnologias utilizadas

### Frontend

* React
* Vite
* TypeScript
* Axios
* Tailwind CSS
* TanStack Router

### Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* H2 Database
* Maven

## Funcionalidades

* Cadastro de roupas
* Listagem de roupas cadastradas
* Busca de roupas por nome
* Edição de roupas
* Exclusão de roupas
* Integração entre frontend e backend com Axios
* API REST organizada em camadas
* Banco de dados H2 com dados iniciais

## Campos da roupa

Cada roupa possui:

* id
* nome
* categoria
* tamanho
* cor
* público
* preço
* quantidade
* descrição

## Estrutura do projeto

```txt
Sistema Cadastro trabalho
├── backend
│   └── API Spring Boot
│
├── frontend
│   └── Interface React
│
└── README.md
```

## Como rodar o backend

Acesse a pasta do backend:

```bash
cd "C:\Users\serratec\Documents\IA\Sistema Cadastro trabalho\backend"
```

Execute a aplicação Spring Boot pelo VS Code, IntelliJ ou Eclipse, rodando a classe:

```txt
StyleStockApplication.java
```

Quando iniciar corretamente, o backend ficará disponível em:

```txt
http://localhost:8080
```

Endpoint principal:

```txt
http://localhost:8080/roupas
```

Console do banco H2:

```txt
http://localhost:8080/h2-console
```

## Como rodar o frontend

Acesse a pasta do frontend:

```bash
cd "C:\Users\serratec\Documents\IA\Sistema Cadastro trabalho\frontend"
```

Instale as dependências:

```bash
npm install
```

Rode o projeto:

```bash
npm run dev
```

O frontend ficará disponível em:

```txt
http://localhost:5173
```

## Endpoints da API

### Listar todas as roupas

```txt
GET /roupas
```

### Buscar roupa por ID

```txt
GET /roupas/{id}
```

### Buscar roupa por nome

```txt
GET /roupas/buscar?nome=camisa
```

### Cadastrar roupa

```txt
POST /roupas
```

Exemplo de JSON:

```json
{
  "nome": "Tenis Casual Branco",
  "categoria": "Tenis",
  "tamanho": "38",
  "cor": "Branco",
  "publico": "Unissex",
  "preco": 199.90,
  "quantidade": 18,
  "descricao": "Tenis casual confortavel para o dia a dia."
}
```

### Editar roupa

```txt
PUT /roupas/{id}
```

Exemplo de JSON:

```json
{
  "nome": "Camisa Social Branca Premium",
  "categoria": "Camisas",
  "tamanho": "M",
  "cor": "Branco",
  "publico": "Masculino",
  "preco": 149.90,
  "quantidade": 12,
  "descricao": "Camisa social elegante para trabalho e eventos."
}
```

### Excluir roupa

```txt
DELETE /roupas/{id}
```

## Integração frontend e backend

O frontend utiliza Axios para consumir a API do backend.

Arquivo principal da integração:

```txt
frontend/src/lib/api.ts
```

A URL base configurada é:

```txt
http://localhost:8080
```

O backend possui configuração de CORS permitindo requisições do frontend em:

```txt
http://localhost:5173
```

## Organização do backend

O backend foi organizado em camadas:

```txt
controller
service
repository
entity
config
```

* `RoupaController`: responsável pelos endpoints da API.
* `RoupaService`: responsável pelas regras e operações do sistema.
* `RoupaRepository`: responsável pela comunicação com o banco de dados.
* `Roupa`: entidade que representa a tabela de roupas.
* `CorsConfig`: configuração para permitir integração com o frontend.

## Organização do frontend

O frontend possui rotas e componentes para as telas principais:

```txt
src/routes/index.tsx
src/routes/roupas.tsx
src/routes/cadastrar.tsx
src/routes/editar.$id.tsx
src/routes/buscar.tsx
src/components/RoupaForm.tsx
src/lib/api.ts
src/lib/types.ts
```

## Observação

O sistema utiliza banco H2 em memória. Por isso, os dados são recriados ao reiniciar o backend, usando o arquivo `data.sql`.

Projeto desenvolvido para atividade prática de integração entre frontend React e backend Spring Boot.
