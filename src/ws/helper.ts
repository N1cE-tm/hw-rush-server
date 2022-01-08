import type { ClientSocket } from "./types";
import { wss } from "@/services/express";

export function stringify(this: ClientSocket, method: string, payload: any = {}) {
	try {
		return JSON.stringify({ method, payload, id: this.id || "" });
	} catch (error: any) {
		return JSON.stringify({ method, id: this.id || "", error: error.message });
	}
}

export function json(this: ClientSocket, method: string, payload: any = {}) {
	this.send(this.stringify(method, payload));
}

export function notify(this: ClientSocket, method: string, payload: any = {}, exclude: string | false = false) {
	this.broadcast((client: ClientSocket) => {
		if (client.id != exclude) {
			client.json(method, payload);
		}
	});
}

export const broadcast = (
	callbackfn: (client: ClientSocket, client2: ClientSocket, set: Set<ClientSocket>) => void
) => {
	(wss.clients as Set<ClientSocket>).forEach(callbackfn);
};
