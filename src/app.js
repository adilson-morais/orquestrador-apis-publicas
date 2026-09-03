const express = require('express');
const cepRoutes = require('./routes/cepRoutes');

const app = express();

app.use(cepRoutes);

const PORTA = process.env.PORTA || 3000;

// Só sobe o servidor de verdade se este arquivo for executado
// diretamente (node src/app.js) — não quando for importado por um
// teste, o que evitaria a porta ficar ocupada durante os testes.
if (require.main === module) {
  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
  });
}

module.exports = app;