// arquivo temporário, só pra testar — apagar antes de commitar
const { buscarCep } = require('./src/connectors/viaCepConnector');

buscarCep('01310100').then((resultado) => {
  console.log('CEP válido:', resultado);
});

buscarCep('00000000')
  .then((resultado) => console.log('não deveria chegar aqui:', resultado))
  .catch((erro) => console.log('CEP inválido, erro capturado certo:', erro.message));