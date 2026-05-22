# 📋 Gerenciador de Tarefas Full-Stack

Um sistema completo de gerenciamento de tarefas (Task Manager) com painel administrativo seguro. Este projeto foi desenvolvido utilizando uma arquitetura *Full-Stack*, separando claramente o Back-end (API RESTful em Node.js) do Front-end (Single Page Application com Vanilla JavaScript e Tailwind CSS).

## 🚀 Sobre o Projeto

O objetivo desta aplicação é fornecer uma interface intuitiva para o gerenciamento de tarefas diárias. O sistema conta com autenticação segura de usuários via JWT, operações completas de CRUD (Criar, Ler, Atualizar, Deletar) e filtros dinâmicos na interface, sem a necessidade de recarregar a página.

## ✨ Funcionalidades

### 💻 Front-end (Painel Admin)
* **Design Responsivo e Moderno:** Estilização utilitária utilizando Tailwind CSS.
* **Autenticação:** Tela de login integrada com a API e gerenciamento de sessão via `LocalStorage` (Token JWT).
* **Gestão de Tarefas (CRUD):** Criação, edição, visualização e exclusão de tarefas através de Modais interativos.
* **Filtros Dinâmicos:** Filtragem em tempo real por **Estado** (Pendente, Em Progresso, Concluída, Bloqueada) e **Prioridade** (Baixa, Média, Alta, Urgente).
* **Feedback Visual:** Sistema de *Toasts* (alertas) customizados para informar sucesso, erro ou informações do sistema.
* **Alertas de Prazo:** Destaque visual automático (linhas vermelhas) para tarefas com data limite de entrega atrasada.

### ⚙️ Back-end (API RESTful)
* **Arquitetura MVC:** Estrutura organizada em rotas, controladores e middlewares.
* **Segurança:** Rotas protegidas por middleware de autenticação (verificação de token JWT).
* **Banco de Dados:** Conexão configurada para persistência de dados.
* **Script de Setup:** Rota/script isolado (`createAdmin.js`) para geração do primeiro usuário administrador.

## 🛠️ Tecnologias Utilizadas

**Front-end:**
* HTML5
* JavaScript (ES6+ - Fetch API, Async/Await)
* Tailwind CSS (via CDN)
* FontAwesome (Ícones)

**Back-end:**
* Node.js
* Express.js
* JWT (JSON Web Tokens) para autenticação
* Banco de Dados (Configuração via `db.js`)
