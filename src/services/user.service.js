const Models = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');

class UserService {
	constructor(sequelize) {
		Models(sequelize);
		this.client = sequelize;
		this.models = sequelize.models;
	}

	async getAllUsers() {
		return await this.models.users.findAll();
	}

	async createUser({ nome, email, senha, telefones }) {
		const id = crypto.randomUUID();
		const hashedPassword = await bcrypt.hash(senha, parseInt(process.env.SALT_ROUNDS));
		const user = await this.models.users.findOne({ where: { email } });

		if (user) {
			return { mensagem: 'E-mail já existente' };
		}

		const result = await this.models.users.create({ id, nome, email, senha: hashedPassword, telefones });

		if (!result) {
			return { mensagem: 'Erro ao criar usuário' };
		}

		const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30m' });

		return { id: result.id, data_criacao: result.data_criacao, data_atualizacao: result.data_atualizacao, ultimo_login: result.ultimo_login, token };
	}

	async signIn({ email, senha }) {
		const user = await this.models.users.findOne({ where: { email } });

		if (!user) {
			return { mensagem: 'Usuário e/ou senha inválidos' };
		}

		const match = await bcrypt.compare(senha, user.senha);

		if (!match) {
			return { mensagem: 'Usuário e/ou senha inválidos' };
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });

		await this.models.users.update({ ultimo_login: new Date() }, { where: { id: user.id } });

		return { id: user.id, data_criacao: user.data_criacao, data_atualizacao: user.data_atualizacao, ultimo_login: user.ultimo_login, token };
	}

	async getUserById(id) {
		const user = await this.models.users.findOne({ where: { id } });

		if (!user) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		return user;
	}
}

module.exports = UserService;