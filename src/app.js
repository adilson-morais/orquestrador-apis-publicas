const express = require('express');
const cepRoutes = require('./routes/cepRoutes');

const app = express();

app.use(cepRoutes);

const PORTA = process.env.PORTA || 3000;


if (require.main === module) {
  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
  });
}

module.exports = app;