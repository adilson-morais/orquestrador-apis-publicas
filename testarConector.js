// arquivo temporário, só pra testar — pode apagar depois
const { buscarCep } = require('./src/connectors/brasilApiConnector');

buscarCep('01310100').then((resultado) => {
  console.log(resultado);
});