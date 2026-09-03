const brasilApiConnector = require('../connectors/brasilApiConnector');
const viaCepConnector = require('../connectors/viaCepConnector');

async function buscarCepConsolidado(cep) {
  try {
    // Promise.any espera a PRIMEIRA promessa que der certo, e só
    // rejeita se TODAS falharem. É diferente de Promise.race, que
    // decide no primeiro "settle" — sucesso OU falha, o que vier
    // primeiro. Aqui, uma fonte lenta mas que funciona não pode
    // perder pra uma fonte rápida que falhou.
    return await Promise.any([
      brasilApiConnector.buscarCep(cep),
      viaCepConnector.buscarCep(cep),
    ]);
  } catch (erro) {
    // Quando todas as promessas de um Promise.any falham, o erro
    // recebido é um AggregateError, com um campo .errors contendo
    // a lista de erros de cada fonte.
    const mensagens = erro.errors.map((e) => e.message).join('; ');
    throw new Error(`Nenhuma fonte conseguiu resolver o CEP ${cep}: ${mensagens}`);
  }
}

module.exports = { buscarCepConsolidado };