const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const routes = require('./routes');
const errorHandler = require('./exception/error.handler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
	customCss: '.swagger-ui .opblock.opblock-patch .opblock-summary-method { background: #b8b6b5; border-color: #b8b6b5; }'
}));
app.use('/api', routes);
app.use((req, res, next) => {
	const error = new Error('A rota solicitada não foi encontrada.');
	error.status = 404;
	next(error);
});
app.use(errorHandler);

module.exports = app;
