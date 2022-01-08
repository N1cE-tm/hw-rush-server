import { generate } from "@neo4j/graphql-ogm";
import { ogm } from "@/services/neo4j";
import * as path from "path";

async function main() {
	// Only generate types when you make a schema change
	const outFile = path.join(__dirname, "ogm-types.ts");

	await generate({
		ogm,
		outFile,
	});

	console.log("Types Generated");

	process.exit(1);
}
main();
