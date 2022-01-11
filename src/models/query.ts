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
