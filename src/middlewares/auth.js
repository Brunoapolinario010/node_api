const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return next(new CustomError(401, 'Não Autorizado.'));
  }

  if (typeof token === 'string') {
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new CustomError(401, 'Não Autorizado.'));
    }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      if (error.message === 'jwt expired') {
        return next(new CustomError(401, 'Sessão inválida'));
      } else {
        return next(new CustomError(401, 'Não Autorizado.'));
      }
    }
  }
};

module.exports = authMiddleware;
