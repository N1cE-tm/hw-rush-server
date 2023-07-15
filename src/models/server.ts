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
		// indexed: true,
	},
	fraction: {
		type: "string",
		// indexed: true,
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
	files: {
		type: "relationships",
		target: "File",
		direction: "out",
		relationship: "HAS_FILE",
		cascade: "detach",
		// properties: {
		//     recived_at: "string"
		// },
		eager: true,
	},
	npc: {
		type: "relationships",
		target: "Npc",
		direction: "out",
		relationship: "HAS_NPC",
		cascade: "detach",
		// properties: {
		//     recived_at: "string"
		// },
		eager: true,
	},
	subnet: {
		type: "relationships",
		target: "Subnet",
		direction: "in",
		relationship: "HAS_SERVER",
		cascade: "detach",
		// properties: {
		//     recived_at: "string"
		// },
		eager: true,
	},
};
