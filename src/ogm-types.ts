import { SelectionSetNode, DocumentNode } from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
};

export type Query = {
  __typename?: "Query";
  servers: Array<Server>;
  serversCount: Scalars["Int"];
  serversAggregate: ServerAggregateSelection;
};

export type QueryServersArgs = {
  where?: Maybe<ServerWhere>;
  options?: Maybe<ServerOptions>;
};

export type QueryServersCountArgs = {
  where?: Maybe<ServerWhere>;
};

export type QueryServersAggregateArgs = {
  where?: Maybe<ServerWhere>;
};

export type Mutation = {
  __typename?: "Mutation";
  createServers: CreateServersMutationResponse;
  deleteServers: DeleteInfo;
  updateServers: UpdateServersMutationResponse;
};

export type MutationCreateServersArgs = {
  input: Array<ServerCreateInput>;
};

export type MutationDeleteServersArgs = {
  where?: Maybe<ServerWhere>;
  delete?: Maybe<ServerDeleteInput>;
};

export type MutationUpdateServersArgs = {
  where?: Maybe<ServerWhere>;
  update?: Maybe<ServerUpdateInput>;
  connect?: Maybe<ServerConnectInput>;
  disconnect?: Maybe<ServerDisconnectInput>;
  create?: Maybe<ServerRelationInput>;
  delete?: Maybe<ServerDeleteInput>;
  connectOrCreate?: Maybe<ServerConnectOrCreateInput>;
};

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = "ASC",
  /** Sort by field values in descending order. */
  Desc = "DESC",
}

export type CreateInfo = {
  __typename?: "CreateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
};

export type CreateServersMutationResponse = {
  __typename?: "CreateServersMutationResponse";
  info: CreateInfo;
  servers: Array<Server>;
};

export type DeleteInfo = {
  __typename?: "DeleteInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesDeleted: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type Server = {
  __typename?: "Server";
  name?: Maybe<Scalars["String"]>;
  edges?: Maybe<Array<Maybe<Server>>>;
  edgesAggregate?: Maybe<ServerServerEdgesAggregationSelection>;
  edgesConnection: ServerEdgesConnection;
};

export type ServerEdgesArgs = {
  where?: Maybe<ServerWhere>;
  options?: Maybe<ServerOptions>;
};

export type ServerEdgesAggregateArgs = {
  where?: Maybe<ServerWhere>;
};

export type ServerEdgesConnectionArgs = {
  where?: Maybe<ServerEdgesConnectionWhere>;
  sort?: Maybe<Array<ServerEdgesConnectionSort>>;
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
};

export type ServerAggregateSelection = {
  __typename?: "ServerAggregateSelection";
  count: Scalars["Int"];
  name: StringAggregateSelection;
};

export type ServerEdgesConnection = {
  __typename?: "ServerEdgesConnection";
  edges: Array<ServerEdgesRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ServerEdgesRelationship = {
  __typename?: "ServerEdgesRelationship";
  cursor: Scalars["String"];
  node: Server;
};

export type ServerServerEdgesAggregationSelection = {
  __typename?: "ServerServerEdgesAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ServerServerEdgesNodeAggregateSelection>;
};

export type ServerServerEdgesNodeAggregateSelection = {
  __typename?: "ServerServerEdgesNodeAggregateSelection";
  name: StringAggregateSelection;
};

export type StringAggregateSelection = {
  __typename?: "StringAggregateSelection";
  shortest?: Maybe<Scalars["String"]>;
  longest?: Maybe<Scalars["String"]>;
};

export type UpdateInfo = {
  __typename?: "UpdateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  nodesDeleted: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type UpdateServersMutationResponse = {
  __typename?: "UpdateServersMutationResponse";
  info: UpdateInfo;
  servers: Array<Server>;
};

export type ServerConnectInput = {
  edges?: Maybe<Array<ServerEdgesConnectFieldInput>>;
};

export type ServerConnectOrCreateInput = {
  edges?: Maybe<Array<ServerEdgesConnectOrCreateFieldInput>>;
};

export type ServerConnectOrCreateWhere = {
  node: ServerUniqueWhere;
};

export type ServerConnectWhere = {
  node: ServerWhere;
};

export type ServerCreateInput = {
  name?: Maybe<Scalars["String"]>;
  edges?: Maybe<ServerEdgesFieldInput>;
};

export type ServerDeleteInput = {
  edges?: Maybe<Array<ServerEdgesDeleteFieldInput>>;
};

export type ServerDisconnectInput = {
  edges?: Maybe<Array<ServerEdgesDisconnectFieldInput>>;
};

export type ServerEdgesAggregateInput = {
  count?: Maybe<Scalars["Int"]>;
  count_LT?: Maybe<Scalars["Int"]>;
  count_LTE?: Maybe<Scalars["Int"]>;
  count_GT?: Maybe<Scalars["Int"]>;
  count_GTE?: Maybe<Scalars["Int"]>;
  AND?: Maybe<Array<ServerEdgesAggregateInput>>;
  OR?: Maybe<Array<ServerEdgesAggregateInput>>;
  node?: Maybe<ServerEdgesNodeAggregationWhereInput>;
};

export type ServerEdgesConnectFieldInput = {
  where?: Maybe<ServerConnectWhere>;
  connect?: Maybe<Array<ServerConnectInput>>;
};

export type ServerEdgesConnectionSort = {
  node?: Maybe<ServerSort>;
};

export type ServerEdgesConnectionWhere = {
  AND?: Maybe<Array<ServerEdgesConnectionWhere>>;
  OR?: Maybe<Array<ServerEdgesConnectionWhere>>;
  node?: Maybe<ServerWhere>;
  node_NOT?: Maybe<ServerWhere>;
};

export type ServerEdgesConnectOrCreateFieldInput = {
  where: ServerConnectOrCreateWhere;
  onCreate: ServerEdgesConnectOrCreateFieldInputOnCreate;
};

export type ServerEdgesConnectOrCreateFieldInputOnCreate = {
  node: ServerCreateInput;
};

export type ServerEdgesCreateFieldInput = {
  node: ServerCreateInput;
};

export type ServerEdgesDeleteFieldInput = {
  where?: Maybe<ServerEdgesConnectionWhere>;
  delete?: Maybe<ServerDeleteInput>;
};

export type ServerEdgesDisconnectFieldInput = {
  where?: Maybe<ServerEdgesConnectionWhere>;
  disconnect?: Maybe<ServerDisconnectInput>;
};

export type ServerEdgesFieldInput = {
  create?: Maybe<Array<ServerEdgesCreateFieldInput>>;
  connect?: Maybe<Array<ServerEdgesConnectFieldInput>>;
  connectOrCreate?: Maybe<Array<ServerEdgesConnectOrCreateFieldInput>>;
};

export type ServerEdgesNodeAggregationWhereInput = {
  AND?: Maybe<Array<ServerEdgesNodeAggregationWhereInput>>;
  OR?: Maybe<Array<ServerEdgesNodeAggregationWhereInput>>;
  name_EQUAL?: Maybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: Maybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: Maybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: Maybe<Scalars["Int"]>;
  name_GT?: Maybe<Scalars["Int"]>;
  name_AVERAGE_GT?: Maybe<Scalars["Float"]>;
  name_LONGEST_GT?: Maybe<Scalars["Int"]>;
  name_SHORTEST_GT?: Maybe<Scalars["Int"]>;
  name_GTE?: Maybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: Maybe<Scalars["Float"]>;
  name_LONGEST_GTE?: Maybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: Maybe<Scalars["Int"]>;
  name_LT?: Maybe<Scalars["Int"]>;
  name_AVERAGE_LT?: Maybe<Scalars["Float"]>;
  name_LONGEST_LT?: Maybe<Scalars["Int"]>;
  name_SHORTEST_LT?: Maybe<Scalars["Int"]>;
  name_LTE?: Maybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: Maybe<Scalars["Float"]>;
  name_LONGEST_LTE?: Maybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: Maybe<Scalars["Int"]>;
};

export type ServerEdgesUpdateConnectionInput = {
  node?: Maybe<ServerUpdateInput>;
};

export type ServerEdgesUpdateFieldInput = {
  where?: Maybe<ServerEdgesConnectionWhere>;
  update?: Maybe<ServerEdgesUpdateConnectionInput>;
  connect?: Maybe<Array<ServerEdgesConnectFieldInput>>;
  disconnect?: Maybe<Array<ServerEdgesDisconnectFieldInput>>;
  create?: Maybe<Array<ServerEdgesCreateFieldInput>>;
  delete?: Maybe<Array<ServerEdgesDeleteFieldInput>>;
  connectOrCreate?: Maybe<Array<ServerEdgesConnectOrCreateFieldInput>>;
};

export type ServerOptions = {
  /** Specify one or more ServerSort objects to sort Servers by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ServerSort>>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type ServerRelationInput = {
  edges?: Maybe<Array<ServerEdgesCreateFieldInput>>;
};

/** Fields to sort Servers by. The order in which sorts are applied is not guaranteed when specifying many fields in one ServerSort object. */
export type ServerSort = {
  name?: Maybe<SortDirection>;
};

export type ServerUniqueWhere = {
  name?: Maybe<Scalars["String"]>;
};

export type ServerUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  edges?: Maybe<Array<ServerEdgesUpdateFieldInput>>;
};

export type ServerWhere = {
  OR?: Maybe<Array<ServerWhere>>;
  AND?: Maybe<Array<ServerWhere>>;
  name?: Maybe<Scalars["String"]>;
  name_NOT?: Maybe<Scalars["String"]>;
  name_IN?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name_NOT_IN?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name_CONTAINS?: Maybe<Scalars["String"]>;
  name_NOT_CONTAINS?: Maybe<Scalars["String"]>;
  name_STARTS_WITH?: Maybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: Maybe<Scalars["String"]>;
  name_ENDS_WITH?: Maybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: Maybe<Scalars["String"]>;
  edges?: Maybe<ServerWhere>;
  edges_NOT?: Maybe<ServerWhere>;
  edgesAggregate?: Maybe<ServerEdgesAggregateInput>;
  edgesConnection?: Maybe<ServerEdgesConnectionWhere>;
  edgesConnection_NOT?: Maybe<ServerEdgesConnectionWhere>;
};

export interface StringAggregateInput {
  shortest?: boolean;
  longest?: boolean;
}
export interface ServerAggregateInput {
  count?: boolean;
  name?: StringAggregateInput;
}

export declare class ServerModel {
  public find(args?: {
    where?: ServerWhere;

    options?: ServerOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Server[]>;
  public count(args?: { where?: ServerWhere }): Promise<number>;
  public create(args: {
    input: ServerCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateServersMutationResponse>;
  public update(args: {
    where?: ServerWhere;
    update?: ServerUpdateInput;
    connect?: ServerConnectInput;
    disconnect?: ServerDisconnectInput;
    create?: ServerCreateInput;
    connectOrCreate?: ServerConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateServersMutationResponse>;
  public delete(args: {
    where?: ServerWhere;
    delete?: ServerDeleteInput;
    context?: any;
    rootValue: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ServerWhere;

    aggregate: ServerAggregateInput;
    context?: any;
    rootValue?: any;
  }): Promise<ServerAggregateSelection>;
}

export interface ModelMap {
  Server: ServerModel;
}
