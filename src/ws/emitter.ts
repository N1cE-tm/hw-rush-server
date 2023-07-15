import { getEdges, getFiles, getNpc, getServers, getSubnet, switchSubnet } from "@/controllers/ws";
import EventEmitter from "events";
const emitter = new EventEmitter();

emitter.on("data/subnets", getSubnet);
emitter.on("data/servers", getServers);
emitter.on("data/edges", getEdges);
emitter.on("data/files", getFiles);
emitter.on("data/npc", getNpc);

emitter.on("data/subnets/switch", switchSubnet);

export default emitter;
