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
		database: process.env.NEO4J_DATABASE || "neo4j",
		username: process.env.NEO4J_USERNAME || "neo4j",
		password: process.env.NEO4J_PASSWORD || "neo4j",
		host: process.env.NEO4J_HOST || "neo4j://localhost:7687",
	},
};
