import type { Request } from "express";
import type { WebSocket } from "@/ws/types";
import express from "express";
import expressWs from "express-ws";
import cors from "cors";
import config from "@/config";
import routes from "@/routes";
import { wsHandler } from "@/ws";
import { error } from "@/middlewares/error";

const { app, getWss } = expressWs(express(), undefined, { wsOptions: { clientTracking: true } });

export const wss = getWss();

/**
 * Security
 */
app.use(cors());

/**
 * Request middleware's
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Routing
 */
app.use("/", routes);
app.ws("/ws", wsHandler as (ws: WebSocket, req: Request) => Promise<void>);
app.use(error);

/**
 * Export
 */
export const start = () => {
	app.listen(config.port, async (err?: Error) => {
		if (err) {
			console.error(`Error : ${err}`);
			process.exit(-1);
		}

		console.log(`${config.app} is running on ${config.port}`);
	});
};

export { app };
