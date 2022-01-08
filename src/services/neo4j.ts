import config from "@/config";
import { OGM } from "@neo4j/graphql-ogm";
import neo4j from "neo4j-driver";

// Initialize knex.

export const driver = neo4j.driver("neo4j://n1ce.me:7687", neo4j.auth.basic("neo4j", "48904942q"), {});

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
		driverConfig: { database: "hackerwars" },
	},
});

export const connect = async () => {};
