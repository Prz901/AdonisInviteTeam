'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with teams
 */

const Team = use('App/Models/Team');

class TeamController {
	async index({ auth }) {
		const teams = await auth.user.teams().fetch();

		return teams;
	}

	async create({ request, response, view }) {}

	async store({ request, auth }) {
		const data = request.only(['name']);

		const team = await auth.user.teams().create({
			...data,
			user_id: auth.user.id
		});

		return team;
	}

	async show({ params, auth }) {
		const team = await auth.user
			.teams()
			.where('team_id', params.id)
			.fetch();

		return team;
	}

	async update({ params, request, auth }) {
		const data = request.only(['name']);
		if (auth.user) {
			const team = await Team.findBy('id', params.id);

			team.merge(data);

			await team.save();

			return team;
		}
	}

	async destroy({ params, auth }) {
		if (auth.user) {
			const team = await Team.findOrFail(params.id);

			await team.delete();
		}
	}
}

module.exports = TeamController;
