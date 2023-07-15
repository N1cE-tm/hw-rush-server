import type WebSocket from "ws";

interface ClientSocket extends WebSocket {
	user?: any;
	id?: string;
	subnet?: string | null;
	json: (this: ClientSocket, method: string, payload: any) => void;
	stringify: (this: ClientSocket, method: string, payload: any) => void;
	notify: (this: ClientSocket, method: string, payload: any, exclude?: string | false) => void;
	broadcast: (callbackfn: (client: ClientSocket, client2: ClientSocket, set: Set<ClientSocket>) => void) => void;
}

interface ISocketData {
	method?: string;
	id?: string;
	payload?: any;
	[x: string]: any;
}

export { WebSocket, ISocketData, ClientSocket };
