import { RequestHandler } from "express";
import { cache } from "../../index";

//* Request Handler
const handler: RequestHandler = (req, res) => {
	const credits = cache.get("credits");

	//* user param not set
	if (!req.params["userId"]) {
		//* Send all users
		//* return
		res.send(
			credits.map(c => {
				delete c._id;
				return c;
			})
		);
		return;
	}

	//* find user
	//* Return user if found
	//* Else return error
	let user = credits.find(c => c.userId === req.params["userId"]);

	if (user) {
		delete user._id;
		res.send(user);
	} else res.send({ error: 2, message: "User not found." });
};

//* Export handler
export { handler };
