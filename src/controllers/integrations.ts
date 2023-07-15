import type { NextFunction, Request, Response } from "express";
import { ogm } from "@/services/neo4j";
import { broadcast } from "@/ws/helper";
import { query } from "@/models";

export const setData = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// {
		// 	"name": "00000",
		// 	"edges": ["000001", "000002", "000003"],
		// 	"files": [
		// 	{ "name": "3242.zip", "type": "fast" },
		// 	...
		// 	],
		// 	"npc": [
		// 		{ "name": "NPCName", "type": "boss" }
		// 	]
		// }

		const payload = req.body;
		console.log(payload);

		if (!payload.name) throw new Error("Нет названия сервера");

		if (payload.edges && Array.isArray(payload.edges) && payload.edges.length > 0) {
			await ogm.writeCypher(query.botEdges, { server: payload.name, list: payload.edges });

			broadcast((client) => client.json("edges/add", { edges: payload.edges }));
		}

		if (payload.files && Array.isArray(payload.files) && payload.files.length > 0) {
			await ogm.writeCypher(query.botFiles, { server: payload.name, list: payload.files });

			broadcast((client) => client.json("files/add", { server: payload.name, files: payload.files }));
		}

		if (payload.npc && Array.isArray(payload.npc) && payload.npc.length > 0) {
			await ogm.writeCypher(query.botNPC, { server: payload.name, list: payload.npc });

			broadcast((client) => client.json("npc/add", { server: payload.name, npc: payload.npc }));
		}

		if (payload.group?.length > 0) {
			await ogm.writeCypher(query.botSubnet, { server: payload.name, name: payload.group });

			broadcast((client) => client.json("subnet/add", { server: payload.name, name: payload.group }));
		}

		return res.json({ success: true });
	} catch (e: any) {
		return res.json({ success: false, message: e.message || "Что-то пошло не так" });
	}
};
