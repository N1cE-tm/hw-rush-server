import type { SchemaObject } from "neode";

export const schema: SchemaObject = {
	name: {
		type: "string",
		unique: true,
		// indexed: true,
		required: true,
	},
	server: {
		type: "relationship",
		target: "Server",
		direction: "out",
		relationship: "HAS_SERVER",
		cascade: "detach",
		// properties: {
		//     recived_at: "string"
		// },
		eager: true,
	},
};
