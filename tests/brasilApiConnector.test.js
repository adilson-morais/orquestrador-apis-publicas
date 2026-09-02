const { normalizarResposta } = require('../src/connectors/brasilApiConnector');

describe('brasilApiConnector - normalizarResposta', () => {
  it('converte o formato da BrasilAPI para o formato padrão do projeto', () => {
    // Exemplo real de resposta da BrasilAPI (documentação oficial)
    const respostaReal = {
      cep: '05010000',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Perdizes',
      street: 'Rua Caiubi',
    };

    const resultado = normalizarResposta(respostaReal);

    expect(resultado).toEqual({
      cep: '05010000',
      logradouro: 'Rua Caiubi',
      bairro: 'Perdizes',
      cidade: 'São Paulo',
      estado: 'SP',
      fonte: 'brasilapi',
    });
  });
});