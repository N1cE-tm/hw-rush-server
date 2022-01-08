import express from "express";
import servers from "./servers";

const router = express.Router();

router.use("", servers);
// router.use("/servers", servers);

export default router;
