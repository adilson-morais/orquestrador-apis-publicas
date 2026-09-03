const { normalizarCep } = require('../utils/cep');

const BASE_URL = 'https://viacep.com.br/ws';

// Função pura: só transforma dados, não faz nenhuma chamada de rede.
function normalizarResposta(dadosBrutos) {
  return {
    cep: normalizarCep(dadosBrutos.cep),
    logradouro: dadosBrutos.logradouro,
    bairro: dadosBrutos.bairro,
    cidade: dadosBrutos.localidade,
    estado: dadosBrutos.uf,
    fonte: 'viacep',
  };
}

// Função com efeito colateral (faz uma chamada HTTP de verdade).
async function buscarCep(cep) {
  const resposta = await fetch(`${BASE_URL}/${cep}/json/`);

  if (!resposta.ok) {
    throw new Error(`ViaCEP: CEP ${cep} - serviço indisponível`);
  }

  const dadosBrutos = await resposta.json();

  // Pegadinha real da ViaCEP: CEP inexistente volta com HTTP 200 (não
  // com um status de erro), então "resposta.ok" sozinho não é suficiente
  // pra saber se deu certo. Precisa checar esse campo no corpo também.
  if (dadosBrutos.erro) {
    throw new Error(`ViaCEP: CEP ${cep} não encontrado`);
  }

  return normalizarResposta(dadosBrutos);
}

module.exports = { buscarCep, normalizarResposta };