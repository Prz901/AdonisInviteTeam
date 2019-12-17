'use strict';

const User = use('App/Models/User');
const Invite = use('App/Models/Invite');

class UserController {
	async store({ request, response, auth }) {
		const data = request.only(['name', 'email', 'password']);

		const teamsQuery = Invite.query().where('email', data.email);
		//.Pluck serve para trazer um array com todos os ids de times que o usuario foi convidado
		// [3,4,5,6,7] mais ou menos dessa forma
		const teams = await teamsQuery.pluck('team_id');

		if (teams.length == 0) {
			return response.status(401).send({ message: 'Voce nao foi convidado por nenhum time' });
		}
		const user = await User.create(data);

		await user.teams().attach(teams);

		await teamsQuery.delete();

		const token = await auth.attempt(data.email, data.password);

		return token;
	}
}

module.exports = UserController;
