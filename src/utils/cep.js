
function normalizarCep(cep) {
  return cep.replace(/\D/g, '');
}

module.exports = { normalizarCep };