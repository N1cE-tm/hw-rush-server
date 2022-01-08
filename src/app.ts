import * as app from "@/services/express";
import * as db from "@/services/neo4j";

db.connect();
app.start();

module.exports = app;
