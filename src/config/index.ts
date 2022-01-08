import * as dotenv from "dotenv";
dotenv.config();

export default {
	port: process.env.PORT || 5000,
	app: process.env.APP || "APP",
	env: process.env.NODE_ENV || "dev",
	// hostname: process.env.HOSTNAME,
	url: {
		client: process.env.CLIENT_URL || "/",
	},

	neo4j: {
		database: process.env.NEO4J_DATABASE,
		username: process.env.NEO4J_USERNAME,
		password: process.env.NEO4J_PASSWORD,
		host: process.env.NEO4J_HOST,
	},
};
