import type { ClientSocket } from "@/ws/types";
import { ogm } from "@/services/neo4j";
import { query } from "@/models";

export const getServers = async (_: any, ws: ClientSocket) => {
	try {
		const Server = ogm.model("Server");
		const list: any = await Server.all().then((c) => c.toJson());

		const result = [];

		for (let node of list) {
			result.push({
				name: node.name,
				type: node?.type || "default",
				fraction: node?.fraction || null,
			});
		}

		return ws.json("data/servers", result);
	} catch (e: any) {
		return ws.json("error", `[data/servers] ${e.message}`);
	}
};

export const getEdges = async (_: any, ws: ClientSocket) => {
	try {
		const result = [];

		const { records } = await ogm.cypher(query.getEdges, {});

		for (let record of records) {
			const [from, to] = record.values();
			result.push({ from, to });
		}

		return ws.json("data/edges", result);
	} catch (e: any) {
		return ws.json("error", `[data/edges] ${e.message}`);
	}
};

export const getFiles = async (_: any, ws: ClientSocket) => {
	try {
		const result = [];

		const { records } = await ogm.cypher(query.getFiles, {});

		for (let record of records) {
			const [name, type, server] = record.values();
			result.push({ name, type, server });
		}

		return ws.json("data/files", result);
	} catch (e: any) {
		return ws.json("error", `[data/files] ${e.message}`);
	}
};

export const getNpc = async (_: any, ws: ClientSocket) => {
	try {
		const result = [];

		const { records } = await ogm.cypher(query.getNpc, {});

		for (let record of records) {
			const [name, type, server] = record.values();
			result.push({ name, type, server });
		}

		return ws.json("data/npc", result);
	} catch (e: any) {
		return ws.json("error", `[data/npc] ${e.message}`);
	}
};
