import config from "@/config";
import { OGM } from "@neo4j/graphql-ogm";
import neo4j from "neo4j-driver";

// Initialize knex.

export const driver = neo4j.driver(
	config.neo4j.host,
	neo4j.auth.basic(config.neo4j.username, config.neo4j.password),
	{}
);

const typeDefs = `
    type Server {
        name: String @unique
        is_main: Boolean
        edges: [Server] @relationship(type: "MOVE_TO", direction: OUT)
    }
`;

export const ogm = new OGM({
	typeDefs,
	driver,
	config: {
		driverConfig: { database: config.neo4j.database },
	},
});

export const connect = async () => {};
