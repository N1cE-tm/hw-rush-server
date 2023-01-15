import { getEdges, getFiles, getNpc, getServers } from "@/controllers/ws";
import EventEmitter from "events";
const emitter = new EventEmitter();

emitter.on("data/servers", getServers);
emitter.on("data/edges", getEdges);
emitter.on("data/files", getFiles);
emitter.on("data/npc", getNpc);

export default emitter;
