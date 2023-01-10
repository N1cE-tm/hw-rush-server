import express from "express";
import {
	getData,
	createNodes,
	deleteNodes,
	connectNodes,
	connectNodesBigdata,
	disconnectNodes,
	setMain,
	getWay,
	getMainWays,
	clear,
	findByName,
	drop,
	addFile,
	clearFiles,
} from "@/controllers/servers";
import { setData } from "@/controllers/integrations";

const router = express.Router();

router.get("/data", getData);
router.post("/search", findByName);
router.post("/way", getWay);
router.post("/file", addFile);
router.post("/way/main", getMainWays);
router.post("/add", createNodes);
router.post("/delete", deleteNodes);
router.post("/connect", connectNodes);
router.post("/bigdata", connectNodesBigdata);
router.post("/disconnect", disconnectNodes);
router.post("/main", setMain);
router.delete("/clear", clear);
router.delete("/drop", drop);
router.delete("/files", clearFiles);

router.post("/bot", setData);

export default router;
