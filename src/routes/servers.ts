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
	clear,
	drop,
} from "@/controllers/servers";

const router = express.Router();

router.get("/data", getData);
router.post("/way", getWay);
router.post("/add", createNodes);
router.post("/delete", deleteNodes);
router.post("/connect", connectNodes);
router.post("/bigdata", connectNodesBigdata);
router.post("/disconnect", disconnectNodes);
router.post("/main", setMain);
router.delete("/clear", clear);
router.delete("/drop", drop);

export default router;
