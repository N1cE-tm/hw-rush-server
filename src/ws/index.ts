import type { Request } from "express";
import type { ClientSocket, WebSocket } from "./types";
import { v4 as uuid } from "uuid";
import { json, stringify, broadcast, notify } from "./helper";
import emitter from "./emitter";

export const wsHandler = async (ws: ClientSocket, req: Request) => {
	const token = req?.query?.token?.toString();

	ws.json = json;
	ws.stringify = stringify;
	ws.broadcast = broadcast;
	ws.notify = notify;

	ws.onclose = (event: WebSocket.CloseEvent) => {
		emitter.emit("close", event, ws);
	};

	ws.on("message", (data: any) => {
		try {
			let parsed = JSON.parse(data);
			if (parsed && parsed.method) emitter.emit(parsed.method, parsed.payload, ws);
		} finally {
			emitter.emit("message", data, ws);
		}
	});

	const id = uuid();
	ws.id = id;
	ws.room = null;

	ws.json("connected", { success: true, id });
};
