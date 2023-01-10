export * as query from "./query";
import { schema as Server } from "./server";
import { schema as File } from "./file";
import { schema as NPC } from "./npc";

export { Server, File, NPC };
export default {
	Server,
	File,
	NPC,
};
