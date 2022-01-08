import express from "express";
import {
	getData,
	connectNodes,
	connectNodesBigdata,
	disconnectNodes,
	setMain,
	getWay,
	clear,
} from "@/controllers/servers";

const router = express.Router();

router.get("/data", getData);
router.post("/way", getWay);
router.post("/connect", connectNodes);
router.post("/bigdata", connectNodesBigdata);
router.post("/disconnect", disconnectNodes);
router.post("/main", setMain);
router.delete("/clear", clear);

export default router;
