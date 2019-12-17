'use strict';

class User {
	//Faz com que todas as validaçoes sejam feitas juntas e nao uma por vez,
	//retorna todos os erros de uma vez se mais regras estiverem sendo burladas
	get validateAll() {
		return true;
	}

	get rules() {
		return {
			name: 'required',
			email: 'required|email|unique:users',
			passwotd: 'required'
		};
	}
}

module.exports = User;
