'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Invite = use('App/Models/Invite');

class InviteController {
	async store({ request, auth }) {
		const invites = request.input('invites');

		const data = invites.map(email => ({
			email,
			user_id: auth.user.id,
			team_id: request.team.id
		}));

		await Invite.createMany(data);
	}
}

module.exports = InviteController;
