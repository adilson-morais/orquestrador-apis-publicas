const { normalizarCep } = require('../utils/cep');

const BASE_URL = 'https://brasilapi.com.br/api/cep/v1';

// Função pura: só transforma dados, não faz nenhuma chamada de rede.
// É por isso que dá pra testar sem precisar da internet.
function normalizarResposta(dadosBrutos) {
  return {
    cep: normalizarCep(dadosBrutos.cep),
    logradouro: dadosBrutos.street,
    bairro: dadosBrutos.neighborhood,
    cidade: dadosBrutos.city,
    estado: dadosBrutos.state,
    fonte: 'brasilapi',
  };
}

// Função com efeito colateral (faz uma chamada HTTP de verdade).
async function buscarCep(cep) {
  const resposta = await fetch(`${BASE_URL}/${cep}`);

  if (!resposta.ok) {
    throw new Error(`BrasilAPI: CEP ${cep} não encontrado ou serviço indisponível`);
  }

  const dadosBrutos = await resposta.json();
  return normalizarResposta(dadosBrutos);
}

module.exports = { buscarCep, normalizarResposta };