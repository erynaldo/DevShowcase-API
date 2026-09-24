const statusNames = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};

const messages = {
  400: 'A requisição contém dados inválidos.',
  401: 'É necessário autenticar para acessar este recurso.',
  403: 'Você não tem permissão para acessar este recurso.',
  404: 'O recurso solicitado não foi encontrado.',
  409: 'A operação entra em conflito com os dados existentes.',
  422: 'Os dados enviados não puderam ser processados.',
  500: 'Ocorreu um erro interno no servidor.',
  502: 'O serviço intermediário recebeu uma resposta inválida.',
  503: 'O serviço está temporariamente indisponível.',
  504: 'O serviço demorou para responder.'
};

const getStatus = error => {
  if (error.statusCode >= 400 && error.statusCode <= 599) return error.statusCode;
  if (error.status >= 400 && error.status <= 599) return error.status;
  if (error.code === 'P1001') return 503;
  if (error.code === 'P1002') return 504;
  if (error.name === 'SyntaxError' && error.status === 400) return 400;
  if (error.code === 'P2002') return 409;
  if (error.code === 'P2025') return 404;
  return 500;
};

const getMessage = (error, status) => {
  if (error.name === 'SyntaxError' && error.status === 400) {
    return 'O corpo da requisição contém JSON inválido.';
  }
  if (error.code === 'P2002') {
    return 'Essa tecnologia já foi cadastrada';
  }
  if (status < 500 && error.message) return error.message;
  return messages[status] || messages[500];
};

const errorHandler = (error, req, res, next) => {
  void next;
  const status = getStatus(error);
  const response = {
    status,
    error: statusNames[status] || 'Error',
    message: getMessage(error, status),
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  };

  if (Array.isArray(error.details) && error.details.length) {
    response.details = error.details;
  }

  if (status >= 500) console.error(error);

  return res.status(status).json(response);
};

module.exports = errorHandler;