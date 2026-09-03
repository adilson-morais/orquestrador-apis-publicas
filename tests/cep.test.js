const { normalizarCep } = require('../src/utils/cep');

describe('normalizarCep', () => {
  it('remove o hífen de um CEP formatado', () => {
    expect(normalizarCep('01310-100')).toBe('01310100');
  });

  it('mantém inalterado um CEP que já vem só com dígitos', () => {
    expect(normalizarCep('01310100')).toBe('01310100');
  });
});