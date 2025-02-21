export default () => ({
    tokkoToken: process.env.TOKKO_TOKEN || '',
    agenciaNombre: process.env.AGENCIA_NOMBRE || '',
    port: process.env.PORT || 3000,
  });