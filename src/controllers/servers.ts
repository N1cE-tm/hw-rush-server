import type { NextFunction, Request, Response } from "express";
import { ogm } from "@/services/neo4j";
import { broadcast } from "@/ws/helper";
import { query } from "@/models";
import { ApiError } from "@/utils/errors";

export const getData = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Server = ogm.model("Server");

		const collection = await Server.all();

		const nodes: any = [];
		const edges: any = [];
		const files: any = {};
		const main: any = {};
		const start: any = ["01F8A000", "01F8A001", "01F8A002", "01F8A003"];

		const list: any = await collection.toJson();

		for (let node of list) {
			if (node.fraction) main[node.name] = node.fraction;
			// if (node.has_file) files.push(node.name);
			nodes.push(node.name);
			if (node?.edges?.length > 0) {
				for (let relation of node.edges) {
					const edge = relation.node;
					edges.push({ from: node.name, to: edge.name, main: !!edge.fraction });
				}
			}

			if (node?.files?.length > 0) {
				if (!files[node.name]) files[node.name] = [];
				for (let relation of node.files) {
					const file = relation.node;
					files[node.name].push(file.name);
				}
			}
		}

		return res.json({
			success: true,
			data: { start, main, files, nodes, edges },
		});
	} catch (e) {
		next(e);
	}
};

export const addFile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { server, files } = req.body;

		await ogm.writeCypher(query.setFile, { server, files });

		broadcast((client) => client.json("files/add", { server, files }));

		return res.json({ success: true });
	} catch (e) {
		next(e);
	}
};

export const findByName = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { query: q } = req.body;
		// const Server = ogm.model("Server");
		// const opperator = query.length > 2 ? `name_CONTAINS` : `name_ENDS_WITH`;
		// const list = await Server.find({ where: { [opperator]: query.toUpperCase() }, options: { limit: 10 } });
		const { records } = await ogm.cypher(query.search, { query: q.toUpperCase() });
		const data: any = [];

		for (let record of records) {
			const [name] = record.values();
			data.push(name);
		}

		return res.json({
			success: true,
			data,
		});
	} catch (e) {
		next(e);
	}
};

export const createNodes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { ids } = req.body;

		const Server = ogm.model("Server");

		await Promise.all(
			ids.map((id: string) => Server.mergeOn({ name: id }, { name: id }).then((node: any) => node.toJson()))
		);

		broadcast((client) => client.json("nodes/add", { nodes: ids }));

		return res.json({
			success: true,
			data: ids,
		});
	} catch (e) {
		next(e);
	}
};

export const deleteNodes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { ids } = req.body;

		await ogm.writeCypher(query.remove, { ids });

		broadcast((client) => client.json("nodes/remove", { nodes: ids }));

		return res.json({
			success: true,
			data: ids,
		});
	} catch (e) {
		next(e);
	}
};

export const connectNodes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { from, to } = req.body;
		if (from.length < 1 || to.length < 1) throw new ApiError(200, "Wrong body");

		const list = to.split(",").map((to: string) => ({ from: from.trim(), to: to.trim() }));

		await ogm.writeCypher(query.update, { list });

		broadcast((client) => client.json("edges/add", { edges: list }));

		return res.json({ success: true, data: list });
	} catch (e) {
		next(e);
	}
};

export const connectNodesBigdata = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { bigdata } = req.body;

		const relation = JSON.parse(bigdata.replaceAll(`'`, `"`).replaceAll(`(`, `[`).replaceAll(`)`, `]`));
		const list = Object.entries(relation).flatMap(([from, [_, to]]: any) => to.map((to: string) => ({ from, to })));

		await ogm.writeCypher(query.update, { list });

		broadcast((client) => client.json("edges/add", { edges: list }));

		return res.json({ success: true, data: list });
	} catch (e) {
		next(e);
	}
};

export const clear = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await ogm.writeCypher(query.clear, {});

		broadcast((client) => client.json("clear", {}));

		return res.json({ success: true, data: data.summary.counters });
	} catch (e) {
		next(e);
	}
};

export const clearFiles = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await ogm.writeCypher(query.clearFiles, {});

		broadcast((client) => client.json("clear", {}));

		return res.json({ success: true, data: data.summary.counters });
	} catch (e) {
		next(e);
	}
};

export const drop = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await ogm.writeCypher(query.drop, {});

		broadcast((client) => client.json("clear", {}));

		return res.json({ success: true, data: data.summary.counters });
	} catch (e) {
		next(e);
	}
};

// Need rewrite
export const disconnectNodes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { from, to } = req.body;

		if (from.length < 1 || to.length < 1) throw new Error("Wrong body");

		const Server = ogm.model("Server");
		const data: any = [];

		// const data = await Server.update({
		// 	where: { name: from },
		// 	disconnect: {
		// 		edges: to.split(",").map((to: string) => ({
		// 			where: { node: { name: to.trim() } },
		// 		})),
		// 	},
		// });

		broadcast((client) =>
			client.json("edges/remove", { edges: to.split(",").map((to: string) => ({ from, to })) })
		);

		return res.json({
			success: true,
			data,
		});
	} catch (e) {
		next(e);
	}
};

export const setMain = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const json = req.body;

		if (Object.keys(json).length < 1) throw new Error("Wrong body");

		const servers = Object.keys(json).map((name) => ({ name, fraction: json[name] }));

		await ogm.writeCypher(query.setMain, { list: servers });

		broadcast((client) => client.json("nodes/main", { main: servers }));

		return res.json({
			success: true,
			data: servers,
		});
	} catch (e) {
		next(e);
	}
};

export const getWay = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const names = req?.body || [];
		if (!Array.isArray(names) || names.length < 2) throw new ApiError(200, "Bad payload");

		const { records } = await ogm.cypher(query.findWay, { names });

		if (records?.length !== names.length - 1) throw new ApiError(200, "No Way");

		const paths = [];
		let cost = 0;
		for (let record of records) {
			const [path, from, to] = record.values();
			const p = (path as any)?.map(({ properties }: any) => properties.name);
			const c = p.length - 1;

			paths.push({ from, to, cost: c, path: p });
			cost += c;
		}

		const data = {
			from: names.at(0),
			to: names.at(-1),
			cost,
			paths,
		};

		return res.json({ success: true, data });
	} catch (e) {
		next(e);
	}
};

export const getMainWays = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { from } = req.body;
		if (from?.length !== 8) throw new ApiError(200, "Bad payload");

		const { records } = await ogm.cypher(query.findWaysToMain, { from });
		const paths = [];
		for (let record of records) {
			const [path, from, to] = record.values();
			paths.push({
				from,
				to,
				path: (path as any)?.map(({ properties }: any) => properties.name) || [],
				cost: (path as any).length - 1,
			});
		}

		return res.json({
			success: !!paths.length,
			data: paths,
		});
	} catch (e) {
		next(e);
	}
};
