const { normalizarResposta } = require('../src/connectors/viaCepConnector');

describe('viaCepConnector - normalizarResposta', () => {
  it('converte o formato da ViaCEP para o formato padrão do projeto', () => {
    const respostaReal = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    };

    const resultado = normalizarResposta(respostaReal);

    expect(resultado).toEqual({
      cep: '01001000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      cidade: 'São Paulo',
      estado: 'SP',
      fonte: 'viacep',
    });
  });
});