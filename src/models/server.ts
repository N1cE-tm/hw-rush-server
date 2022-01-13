import type { SchemaObject } from "neode";

export const schema: SchemaObject = {
	name: {
		type: "string",
		unique: true,
		// indexed: true,
		required: true,
	},
	is_main: {
		type: "boolean",
		default: false,
	},
	edges: {
		type: "relationships",
		target: "Server",
		direction: "out",
		relationship: "MOVE_TO",
		cascade: "detach",
		// properties: {
		//     recived_at: "string"
		// },
		eager: true,
	},
};
