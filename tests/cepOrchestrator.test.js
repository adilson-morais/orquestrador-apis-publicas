const brasilApiConnector = require('../src/connectors/brasilApiConnector');
const viaCepConnector = require('../src/connectors/viaCepConnector');
const { buscarCepConsolidado } = require('../src/services/cepOrchestrator');


jest.mock('../src/connectors/brasilApiConnector');
jest.mock('../src/connectors/viaCepConnector');

describe('cepOrchestrator', () => {
  it('retorna o resultado quando as duas fontes respondem com sucesso', async () => {
    brasilApiConnector.buscarCep.mockResolvedValue({ cep: '01310100', fonte: 'brasilapi' });
    viaCepConnector.buscarCep.mockResolvedValue({ cep: '01310100', fonte: 'viacep' });

    const resultado = await buscarCepConsolidado('01310100');
    expect(resultado.cep).toBe('01310100');
  });

  it('usa a segunda fonte se a primeira falhar', async () => {
    brasilApiConnector.buscarCep.mockRejectedValue(new Error('BrasilAPI fora do ar'));
    viaCepConnector.buscarCep.mockResolvedValue({ cep: '01310100', fonte: 'viacep' });

    const resultado = await buscarCepConsolidado('01310100');
    expect(resultado.fonte).toBe('viacep');
  });

  it('lança erro claro se as duas fontes falharem', async () => {
    brasilApiConnector.buscarCep.mockRejectedValue(new Error('BrasilAPI fora do ar'));
    viaCepConnector.buscarCep.mockRejectedValue(new Error('ViaCEP fora do ar'));

    await expect(buscarCepConsolidado('00000000')).rejects.toThrow(
      'Nenhuma fonte conseguiu resolver'
    );
  });
});