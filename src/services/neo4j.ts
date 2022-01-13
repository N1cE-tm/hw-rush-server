import config from "@/config";
import Neode from "neode";
import models from "@/models";

export const ogm = new Neode(
	config.neo4j.host,
	config.neo4j.username,
	config.neo4j.password,
	true,
	config.neo4j.database
).with(models);

export const connect = async () => {
	try {
		await ogm.cypher(`RETURN 1 + 1`, {});
		console.log("DB: Connected");
	} catch (e) {
		console.log("No DB connection!");
	}
};
