const CustomError = require('../utils/customError');

const customErrorHandler = (err, req, res, next) => {
	if (err instanceof CustomError) {
		return res.status(err.status).json({ mensagem: err.mensagem });
	}

	return res.status(500).json({ mensagem: 'Erro interno no servidor' });
};

module.exports = customErrorHandler;