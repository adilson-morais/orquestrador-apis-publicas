const express = require('express');
const { buscarCepConsolidado } = require('../services/cepOrchestrator');

const router = express.Router();

router.get('/cep/:cep', async (req, res) => {
  const { cep } = req.params;

  // Validação simples de formato — isso é responsabilidade da camada
  // HTTP (a requisição está bem-formada?), não do orquestrador.
  if (!/^\d{8}$/.test(cep)) {
    return res.status(400).json({ erro: 'CEP deve conter exatamente 8 dígitos' });
  }

  try {
    const resultado = await buscarCepConsolidado(cep);
    res.json(resultado);
  } catch (erro) {
    res.status(404).json({ erro: erro.message });
  }
});

module.exports = router;