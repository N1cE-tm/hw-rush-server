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

export const clear = `MATCH (s:Server) OPTIONAL MATCH (s:Server)-[r]-() SET s.is_main = false DELETE r`;

export const drop = `MATCH (s:Server) DETACH DELETE s`;

export const search = `MATCH (s:Server) WHERE s.name ENDS WITH $query RETURN s.name AS name LIMIT 10 `;

export const setMain = `UNWIND $list AS name MERGE (s:Server { name: name })  SET s.is_main = true RETURN s`;

export const update = `
UNWIND $list AS item 
MERGE (n:Server { name: item.from }) 
MERGE (m:Server { name: item.to }) 
MERGE (n)-[r:MOVE_TO]->(m) 
RETURN count(item)
`;
