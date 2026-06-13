# Fundação Cauã Victor — Plataforma de Cursos Online

## Como rodar o projeto

### 1. Instale as dependências
```bash
npm install
```

### 2. Instale o JSON Server globalmente
```bash
npm install -g json-server
```

### 3. Rode o JSON Server (em um terminal separado)
```bash
npx json-server --watch db.json --port 3000
```

### 4. Rode o projeto React (em outro terminal)
```bash
npm run dev
```

### 5. Acesse no navegador
- Projeto: http://localhost:5173
- API: http://localhost:3000

## Estrutura do projeto
```
src/
  components/   → NavBar, Banner, SectionHeader
  pages/        → Inicio, Cursos, Matriculas, Pagamentos
  services/     → api.js (axios + JSON Server)
  models/       → Usuario, Categoria, Curso, Modulo, Aula, Matricula, Progresso, Certificado, Pagamento
```
