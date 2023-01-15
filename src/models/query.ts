export const findWay = `
UNWIND $names as name MATCH (t:Server {name: name})
WITH collect(t) as NS

UNWIND RANGE(0, size(NS)-2) as i1
  WITH NS[i1] as _from,  NS[i1 + 1] as _to
  WHERE _from<>_to
  MATCH p = shortestPath((_from:Server)-[*..20]->(_to:Server))
RETURN NODES(p) as path, _from.name as from, _to.name as to
`;

export const findWaysToMain = `
WITH $from AS from
MATCH p = shortestPath((a:Server)-[*..20]-(b:Server)) 
WHERE a.name = from and b.is_main = true and b.name <> from
return nodes(p) as path, from, b.name as to
`;

export const remove = `MATCH (s:Server) WHERE (s.name IN $ids) DETACH DELETE s`;

export const clear = `MATCH (s:Server) OPTIONAL MATCH (s:Server)-[r]-(:Server) SET s.fraction = false DELETE r`;

export const clearFiles = `MATCH (s:Server) OPTIONAL MATCH (s:Server)-[r:HAS_FILE]-(f:File) DELETE r,f`;

export const drop = `MATCH (s:Server) DETACH DELETE s`;

export const search = `MATCH (s:Server) WHERE s.name ENDS WITH $query RETURN s.name AS name LIMIT 10 `;

export const setFile = `UNWIND $files AS file 
MERGE (s:Server { name: $server }) 
MERGE (f:File { name: file }) 
MERGE (s)-[r:HAS_FILE]->(f) 
RETURN count(file)`;

export const setMain = `UNWIND $list AS i MERGE (s:Server { name: i.name }) SET s.fraction = i.fraction RETURN s`;

export const update = `
UNWIND $list AS item 
MERGE (n:Server { name: item.from }) 
MERGE (m:Server { name: item.to }) 
MERGE (n)-[r:MOVE_TO]->(m) 
RETURN count(item)
`;
//OPTIONAL MATCH ()-[r:HAS_NPC]->(:File { name: item.name, type: item.type }) DELETE r

export const botFiles = `
UNWIND $list AS item 
MERGE (s:Server { name: $server }) 
MERGE (f:File { name: item.name, type: item.type }) 
MERGE (s)-[nr:HAS_FILE]->(f) 
RETURN count(item)
`;

export const botEdges = `
UNWIND $list AS item 
MERGE (n:Server { name: $server }) 
MERGE (m:Server { name: item }) 
MERGE (n)-[r:MOVE_TO]->(m) 
RETURN count(item)
`;

export const botNPC = `
UNWIND $list AS item 
OPTIONAL MATCH ()-[r:HAS_NPC]->(:Npc { name: item.name, type: item.type }) DELETE r
MERGE (s:Server { name: $server }) 
MERGE (f:Npc { name: item.name, type: item.type }) 
MERGE (s)-[nr:HAS_NPC]->(f) 
RETURN count(item)
`;

export const getEdges = `MATCH (f:Server)-[r:MOVE_TO]->(t:Server) WITH f.name as from, t.name as to, r RETURN from, to`;
export const getFiles = `MATCH (f:File)<-[r:HAS_FILE]-(s:Server) WITH s.name as server, f.name as name, f.type as type RETURN name, type, server`;
export const getNpc = `MATCH (n:Npc)<-[:HAS_NPC]-(s:Server) WITH s.name as server, n.name as name, n.type as type RETURN name, type, server`;
export const innerByServer = `MATCH (s:Server { name: $server })-[:MOVE_TO]->(inner:Server) RETURN inner.name as name`;
export const outerByServer = `MATCH (s:Server { name: $server })<-[:MOVE_TO]-(inner:Server) RETURN inner.name as name`;
export const npcByServer = `
MATCH (s:Server { name: $server }) 
    OPTIONAL MATCH (fs:Server)-[:HAS_NPC]->(n:Npc)
    OPTIONAL MATCH p = shortestPath((s)-[:MOVE_TO*1..20]->(fs)) 
    WHERE s <> fs
WITH n.name as name, n.type as type, s.name as server, [node in nodes(p)|node.name] as path
RETURN name, type, server, path
`;

export const filesByServer = `
MATCH (s:Server { name: $server }) 
    OPTIONAL MATCH (fs:Server)-[:HAS_FILE]->(f:File)
    OPTIONAL MATCH p = shortestPath((s)-[:MOVE_TO*1..20]->(fs)) 
    WHERE s <> fs
WITH f.name as name, f.type as type, s.name as server, [node in nodes(p)|node.name] as path
RETURN name, type, server, path
`;
