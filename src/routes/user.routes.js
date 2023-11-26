const express = require('express');
const sequelize = require('../config/database');
const UserService = require('../services/user.service');
const authMiddleware = require('../middlewares/auth');
const customErrorHandler = require('../middlewares/customErrorHandler');

const router = express.Router();

const userService = new UserService(sequelize);

router.get('/users', authMiddleware, customErrorHandler, async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

router.post('/users', customErrorHandler, async (req, res) => {
  const { nome, email, senha, telefones } = req.body;
  const user = await userService.createUser({ nome, email, senha, telefones });
  res.json(user);
});

router.post('/users/signin', customErrorHandler, async (req, res) => {
  const { email, senha } = req.body;

  const user = await userService.signIn({ email, senha });
  res.json(user);
});

router.get('/users/:id', authMiddleware, customErrorHandler, async (req, res) => {
  const { id } = req.params;

  await userService
    .getUserById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error.status).json({ mensagem: error.mensagem });
    });
});

module.exports = router;
