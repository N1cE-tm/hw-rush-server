import { getEdges, getFiles, getServers } from "@/controllers/ws";
import EventEmitter from "events";
const emitter = new EventEmitter();

emitter.on("data/servers", getServers);
emitter.on("data/edges", getEdges);
emitter.on("data/files", getFiles);

export default emitter;
