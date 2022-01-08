import type { Request } from "express";
import type { ClientSocket, WebSocket } from "./types";
import { v4 as uuid } from "uuid";
import { json, stringify, broadcast, notify } from "./helper";
import emmiter from "./emmiter";

export const wsHandler = async (ws: ClientSocket, req: Request) => {
	const token = req?.query?.token?.toString();

	ws.json = json;
	ws.stringify = stringify;
	ws.broadcast = broadcast;
	ws.notify = notify;

	ws.onclose = (event: WebSocket.CloseEvent) => {
		emmiter.emit("close", event, ws);
	};

	ws.on("message", (data: any) => {
		try {
			let parsed = JSON.parse(data);
			if (parsed && parsed.method) emmiter.emit(parsed.method, parsed.payload, ws);
		} finally {
			emmiter.emit("message", data, ws);
		}
	});

	const id = uuid();
	ws.id = id;

	ws.json("connected", { success: true, id });
};
