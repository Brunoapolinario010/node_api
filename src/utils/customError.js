class CustomError {
  status;
  mensagem;

  constructor(status, message) {
    this.status = status;
    this.mensagem = message;
  }

  get Mensagem() {
    return this.mensagem;
  }
}

module.exports = CustomError;
