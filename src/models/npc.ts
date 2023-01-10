import type { SchemaObject } from "neode";

export const schema: SchemaObject = {
	name: {
		type: "string",
		unique: true,
		// indexed: true,
		required: true,
	},
	type: {
		type: "string",
	},
	server: {
		type: "relationship",
		target: "Server",
		direction: "in",
		relationship: "HAS_NPC",
		cascade: "detach",
		// properties: {
		//     recived_at: "string"
		// },
		eager: true,
	},
};
