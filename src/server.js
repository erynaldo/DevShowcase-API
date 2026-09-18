require('dotenv').config();
const app = require('./app');
const prisma = require('./config/prisma');

const port = process.env.PORT || 3000;

prisma.$connect()
  .then(() => {
    app.listen(port, () => console.log(`API rodando na porta ${port}`));
  })
  .catch(error => {
    console.error('Não foi possível conectar ao PostgreSQL:', error.message);
    process.exit(1);
  });
