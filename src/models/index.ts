export * as query from "./query";
import { schema as Server } from "./server";
import { schema as File } from "./file";
import { schema as Npc } from "./npc";
import { schema as Subnet } from "./subnet";

export { Server, File, Npc, Subnet };
export default {
	Server,
	File,
	Npc,
	Subnet,
};
