const brasilApiConnector = require('../connectors/brasilApiConnector');
const viaCepConnector = require('../connectors/viaCepConnector');

async function buscarCepConsolidado(cep) {
  try {

    return await Promise.any([
      brasilApiConnector.buscarCep(cep),
      viaCepConnector.buscarCep(cep),
    ]);
  } catch (erro) {

    const mensagens = erro.errors.map((e) => e.message).join('; ');
    throw new Error(`Nenhuma fonte conseguiu resolver o CEP ${cep}: ${mensagens}`);
  }
}

module.exports = { buscarCepConsolidado };