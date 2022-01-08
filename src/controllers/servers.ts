import type { NextFunction, Request, Response } from "express";
import neo4j from "neo4j-driver";
import { ogm, driver } from "@/services/neo4j";
import { broadcast } from "@/ws/helper";

export const getData = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Server = ogm.model("Server");

		const list = await Server.find({ selectionSet: `{ name is_main edges { name is_main } }` });

		const nodes = [];
		const edges = [];
		const main = [];
		for (let node of list) {
			if (node.is_main) main.push(node.name);
			nodes.push(node.name);
			if (node?.edges?.length > 0) {
				for (let edge of node.edges) {
					edges.push({ from: node.name, to: edge.name, main: edge.is_main });
				}
			}
		}

		return res.json({
			success: true,
			data: { main, nodes, edges },
		});
	} catch (e) {
		next(e);
	}
};

export const createNodes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { ids } = req.body;

		const Server = ogm.model("Server");

		await Server.create({ input: ids.map((id: string) => ({ name: id })) });

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

		const Server = ogm.model("Server");

		await Server.delete({ where: { name_IN: ids } });

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

		if (from.length < 1 || to.length < 1) throw new Error("Wrong body");

		const Server = ogm.model("Server");

		const data = await Server.update({
			where: { name: from },
			connectOrCreate: {
				edges: to.split(",").map((to: string) => ({
					where: { node: { name: to.trim() } },
					onCreate: { node: { name: to.trim() } },
				})),
			},
		});

		broadcast((client) => client.json("edges/add", { edges: to.split(",").map((to: string) => ({ from, to })) }));

		return res.json({
			success: true,
			data,
		});
	} catch (e) {
		next(e);
	}
};

export const connectNodesBigdata = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { bigdata } = req.body;

		const relation = JSON.parse(bigdata.replaceAll(`'`, `"`).replaceAll(`(`, `[`).replaceAll(`)`, `]`));
		const list: any = [];
		const Server = ogm.model("Server");

		for (let [node, rel] of Object.entries<any>(relation)) {
			await Server.update({
				where: { name: node },
				connectOrCreate: {
					edges: rel[1].map((to: string) => {
						list.push({ from: node.trim(), to: to.trim() });
						return {
							where: { node: { name: to.trim() } },
							onCreate: { node: { name: to.trim() } },
						};
					}),
				},
			});
		}

		broadcast((client) => client.json("edges/add", { edges: list }));

		return res.json({
			success: true,
			data: list,
		});
	} catch (e) {
		next(e);
	}
};

export const clear = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Server = ogm.model("Server");

		const data = await Server.update({
			where: { name_NOT: null },
			disconnect: { edges: { where: { node: { name_NOT: null } } } },
			update: { is_main: false },
		});

		broadcast((client) => client.json("clear", {}));

		return res.json({
			success: true,
			data,
		});
	} catch (e) {
		next(e);
	}
};

export const drop = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Server = ogm.model("Server");

		const data = await Server.delete();

		broadcast((client) => client.json("clear", {}));

		return res.json({
			success: true,
			data,
		});
	} catch (e) {
		next(e);
	}
};

export const disconnectNodes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { from, to } = req.body;

		if (from.length < 1 || to.length < 1) throw new Error("Wrong body");

		const Server = ogm.model("Server");

		const data = await Server.update({
			where: { name: from },
			disconnect: {
				edges: to.split(",").map((to: string) => ({
					where: { node: { name: to.trim() } },
				})),
			},
		});

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
		const { list } = req.body;

		if (list.length < 1) throw new Error("Wrong body");

		const Server = ogm.model("Server");

		const servers = list.replaceAll("📟", ",").trim().split(",");

		await Server.update({ where: { is_main: true }, update: { is_main: false } });
		await Server.update({ where: { name_IN: servers }, update: { is_main: true } });

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
		const { from, to } = req.body;
		const session = driver.session({ database: "hackerwars", defaultAccessMode: neo4j.session.READ });

		const { records } = await session.run(
			`MATCH (s1:Server {name: '${from}'}), (s2:Server {name: '${to}'}), p = shortestPath((s1)-[*]->(s2))  WHERE length(p) > 1 RETURN p`,
			{},
			{ timeout: 5000 }
		);
		session.close();

		const path: any = [];

		const result = records[0].get("p");
		if (result?.segments?.length < 1) throw new Error("Путь не найден =(");
		for (let item of result.segments) {
			path.push({
				from: item.start.properties.name,
				to: item.end.properties.name,
			});
		}

		return res.json({
			success: path.length > 1,
			data: path,
		});
	} catch (e) {
		next(e);
	}
};
