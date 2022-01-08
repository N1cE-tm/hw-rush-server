import type { ClientSocket } from "@/ws/types";
import { wss } from "@/services/express";

/**
 * Get all active cursors list
 * @param {object} data - data from WS
 * @param {ClientSocket} ws - WS Client Instance
 */
export const all = (data: any, ws: ClientSocket) => {
	const cursors = [];

	for (let client of (wss.clients as Set<ClientSocket>).values()) {
		if (client.id !== ws.id) cursors.push({ id: client.id, user: client.user });
	}

	ws.json("cursor/all", { cursors });
};

/**
 * Notify about client disconnect
 * @param {CloseEvent} event - WS Close Event
 * @param {ClientSocket} ws - WS Client Instance
 */
export const remove = (event: any, ws: ClientSocket) => {
	ws.notify("cursor/remove", { id: ws.id });
};

/**
 * Broadcast method for notify about new connection
 * @param {object} data - data from WS
 * @param {ClientSocket} ws - WS Client Instance
 */
export const add = async (data: any, ws: ClientSocket) => {
	ws.notify("cursor/add", { id: ws.id, user: data.user }, ws.id);
};

/**
 * Broadcast method for notify about moving cursor by client
 * @param {object} data - data from WS
 * @param {ClientSocket} ws - WS Client Instance
 */
export const move = async (data: any, ws: ClientSocket) => {
	ws.notify("cursor/move", { id: ws.id, x: data.x, y: data.y }, ws.id);
};
