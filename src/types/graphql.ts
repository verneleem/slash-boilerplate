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
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: any;
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: any;
};

export type IntersectsFilter = {
  polygon?: Maybe<PolygonRef>;
  multiPolygon?: Maybe<MultiPolygonRef>;
};

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  between?: Maybe<StringRange>;
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Test = {
  __typename?: 'Test';
  id?: Maybe<Scalars['ID']>;
  test: Scalars['String'];
};

export type Int64Range = {
  min: Scalars['Int64'];
  max: Scalars['Int64'];
};

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE',
}

export type PointRef = {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type AddRestrictedByRoleInput = {
  text?: Maybe<Scalars['String']>;
};

export type RestrictedByOwnerRef = {
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  owner?: Maybe<UserRef>;
};

export enum RestrictedByOwnerOrderable {
  Text = 'text',
}

export enum RestrictedByRoleOrderable {
  Text = 'text',
}

export type StringRange = {
  min: Scalars['String'];
  max: Scalars['String'];
};

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  rule?: Maybe<Scalars['String']>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateTimeRange>;
};

export type UpdateTestInput = {
  filter: TestFilter;
  set?: Maybe<TestPatch>;
  remove?: Maybe<TestPatch>;
};

export type UserOrder = {
  asc?: Maybe<UserOrderable>;
  desc?: Maybe<UserOrderable>;
  then?: Maybe<UserOrder>;
};

export type UserRef = {
  username?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
};

export type AddTestInput = {
  test: Scalars['String'];
};

export type RestrictedByRoleFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  has?: Maybe<RestrictedByRoleHasFilter>;
  and?: Maybe<Array<Maybe<RestrictedByRoleFilter>>>;
  or?: Maybe<Array<Maybe<RestrictedByRoleFilter>>>;
  not?: Maybe<RestrictedByRoleFilter>;
};

export type ContainsFilter = {
  point?: Maybe<PointRef>;
  polygon?: Maybe<PolygonRef>;
};

export type RestrictedByOwnerAggregateResult = {
  __typename?: 'RestrictedByOwnerAggregateResult';
  count?: Maybe<Scalars['Int']>;
  textMin?: Maybe<Scalars['String']>;
  textMax?: Maybe<Scalars['String']>;
};

export type TestRef = {
  id?: Maybe<Scalars['ID']>;
  test?: Maybe<Scalars['String']>;
};

export type UpdateRestrictedByOwnerInput = {
  filter: RestrictedByOwnerFilter;
  set?: Maybe<RestrictedByOwnerPatch>;
  remove?: Maybe<RestrictedByOwnerPatch>;
};

export type RestrictedByOwner = {
  __typename?: 'RestrictedByOwner';
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  owner: User;
};

export type RestrictedByOwnerOwnerArgs = {
  filter?: Maybe<UserFilter>;
};

export type IntRange = {
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export type WithinFilter = {
  polygon: PolygonRef;
};

export type DateTimeRange = {
  min: Scalars['DateTime'];
  max: Scalars['DateTime'];
};

export enum UserHasFilter {
  Username = 'username',
  DisplayName = 'displayName',
  Picture = 'picture',
}

export type RestrictedByOwnerOrder = {
  asc?: Maybe<RestrictedByOwnerOrderable>;
  desc?: Maybe<RestrictedByOwnerOrderable>;
  then?: Maybe<RestrictedByOwnerOrder>;
};

export type RestrictedByOwnerPatch = {
  text?: Maybe<Scalars['String']>;
  owner?: Maybe<UserRef>;
};

export type CustomHttp = {
  url: Scalars['String'];
  method: HttpMethod;
  body?: Maybe<Scalars['String']>;
  graphql?: Maybe<Scalars['String']>;
  mode?: Maybe<Mode>;
  forwardHeaders?: Maybe<Array<Scalars['String']>>;
  secretHeaders?: Maybe<Array<Scalars['String']>>;
  introspectionHeaders?: Maybe<Array<Scalars['String']>>;
  skipIntrospection?: Maybe<Scalars['Boolean']>;
};

export type NearFilter = {
  distance: Scalars['Float'];
  coordinate: PointRef;
};

export type Int64Filter = {
  eq?: Maybe<Scalars['Int64']>;
  le?: Maybe<Scalars['Int64']>;
  lt?: Maybe<Scalars['Int64']>;
  ge?: Maybe<Scalars['Int64']>;
  gt?: Maybe<Scalars['Int64']>;
  between?: Maybe<Int64Range>;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
};

export type TestAggregateResult = {
  __typename?: 'TestAggregateResult';
  count?: Maybe<Scalars['Int']>;
  testMin?: Maybe<Scalars['String']>;
  testMax?: Maybe<Scalars['String']>;
};

export type UserAggregateResult = {
  __typename?: 'UserAggregateResult';
  count?: Maybe<Scalars['Int']>;
  usernameMin?: Maybe<Scalars['String']>;
  usernameMax?: Maybe<Scalars['String']>;
  displayNameMin?: Maybe<Scalars['String']>;
  displayNameMax?: Maybe<Scalars['String']>;
  pictureMin?: Maybe<Scalars['String']>;
  pictureMax?: Maybe<Scalars['String']>;
};

export type TestPatch = {
  test?: Maybe<Scalars['String']>;
};

export type PointGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type AddRestrictedByOwnerPayload = {
  __typename?: 'AddRestrictedByOwnerPayload';
  restrictedByOwner?: Maybe<Array<Maybe<RestrictedByOwner>>>;
  numUids?: Maybe<Scalars['Int']>;
};

export type AddRestrictedByOwnerPayloadRestrictedByOwnerArgs = {
  filter?: Maybe<RestrictedByOwnerFilter>;
  order?: Maybe<RestrictedByOwnerOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateRestrictedByOwnerPayload = {
  __typename?: 'UpdateRestrictedByOwnerPayload';
  restrictedByOwner?: Maybe<Array<Maybe<RestrictedByOwner>>>;
  numUids?: Maybe<Scalars['Int']>;
};

export type UpdateRestrictedByOwnerPayloadRestrictedByOwnerArgs = {
  filter?: Maybe<RestrictedByOwnerFilter>;
  order?: Maybe<RestrictedByOwnerOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type RestrictedByRoleOrder = {
  asc?: Maybe<RestrictedByRoleOrderable>;
  desc?: Maybe<RestrictedByRoleOrderable>;
  then?: Maybe<RestrictedByRoleOrder>;
};

export type UserFilter = {
  username?: Maybe<StringHashFilter>;
  has?: Maybe<UserHasFilter>;
  and?: Maybe<Array<Maybe<UserFilter>>>;
  or?: Maybe<Array<Maybe<UserFilter>>>;
  not?: Maybe<UserFilter>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>;
  update?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
};

export type DeleteRestrictedByRolePayload = {
  __typename?: 'DeleteRestrictedByRolePayload';
  restrictedByRole?: Maybe<Array<Maybe<RestrictedByRole>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type DeleteRestrictedByRolePayloadRestrictedByRoleArgs = {
  filter?: Maybe<RestrictedByRoleFilter>;
  order?: Maybe<RestrictedByRoleOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateTestPayload = {
  __typename?: 'UpdateTestPayload';
  test?: Maybe<Array<Maybe<Test>>>;
  numUids?: Maybe<Scalars['Int']>;
};

export type UpdateTestPayloadTestArgs = {
  filter?: Maybe<TestFilter>;
  order?: Maybe<TestOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum RestrictedByOwnerHasFilter {
  Text = 'text',
  Owner = 'owner',
}

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export type UpdateRestrictedByRolePayload = {
  __typename?: 'UpdateRestrictedByRolePayload';
  restrictedByRole?: Maybe<Array<Maybe<RestrictedByRole>>>;
  numUids?: Maybe<Scalars['Int']>;
};

export type UpdateRestrictedByRolePayloadRestrictedByRoleArgs = {
  filter?: Maybe<RestrictedByRoleFilter>;
  order?: Maybe<RestrictedByRoleOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  user?: Maybe<Array<Maybe<User>>>;
  numUids?: Maybe<Scalars['Int']>;
};

export type UpdateUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type RestrictedByOwnerFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  has?: Maybe<RestrictedByOwnerHasFilter>;
  and?: Maybe<Array<Maybe<RestrictedByOwnerFilter>>>;
  or?: Maybe<Array<Maybe<RestrictedByOwnerFilter>>>;
  not?: Maybe<RestrictedByOwnerFilter>;
};

export type RestrictedByRolePatch = {
  text?: Maybe<Scalars['String']>;
};

export type RestrictedByRoleRef = {
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type UpdateRestrictedByRoleInput = {
  filter: RestrictedByRoleFilter;
  set?: Maybe<RestrictedByRolePatch>;
  remove?: Maybe<RestrictedByRolePatch>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export type FloatRange = {
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type Point = {
  __typename?: 'Point';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  between?: Maybe<FloatRange>;
};

export type DeleteTestPayload = {
  __typename?: 'DeleteTestPayload';
  test?: Maybe<Array<Maybe<Test>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type DeleteTestPayloadTestArgs = {
  filter?: Maybe<TestFilter>;
  order?: Maybe<TestOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type RestrictedByRole = {
  __typename?: 'RestrictedByRole';
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  between?: Maybe<IntRange>;
};

export type Query = {
  __typename?: 'Query';
  getTest?: Maybe<Test>;
  queryTest?: Maybe<Array<Maybe<Test>>>;
  aggregateTest?: Maybe<TestAggregateResult>;
  getUser?: Maybe<User>;
  queryUser?: Maybe<Array<Maybe<User>>>;
  aggregateUser?: Maybe<UserAggregateResult>;
  getRestrictedByRole?: Maybe<RestrictedByRole>;
  queryRestrictedByRole?: Maybe<Array<Maybe<RestrictedByRole>>>;
  aggregateRestrictedByRole?: Maybe<RestrictedByRoleAggregateResult>;
  getRestrictedByOwner?: Maybe<RestrictedByOwner>;
  queryRestrictedByOwner?: Maybe<Array<Maybe<RestrictedByOwner>>>;
  aggregateRestrictedByOwner?: Maybe<RestrictedByOwnerAggregateResult>;
};

export type QueryGetTestArgs = {
  id: Scalars['ID'];
};

export type QueryQueryTestArgs = {
  filter?: Maybe<TestFilter>;
  order?: Maybe<TestOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryAggregateTestArgs = {
  filter?: Maybe<TestFilter>;
};

export type QueryGetUserArgs = {
  username: Scalars['String'];
};

export type QueryQueryUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryAggregateUserArgs = {
  filter?: Maybe<UserFilter>;
};

export type QueryGetRestrictedByRoleArgs = {
  id: Scalars['ID'];
};

export type QueryQueryRestrictedByRoleArgs = {
  filter?: Maybe<RestrictedByRoleFilter>;
  order?: Maybe<RestrictedByRoleOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryAggregateRestrictedByRoleArgs = {
  filter?: Maybe<RestrictedByRoleFilter>;
};

export type QueryGetRestrictedByOwnerArgs = {
  id: Scalars['ID'];
};

export type QueryQueryRestrictedByOwnerArgs = {
  filter?: Maybe<RestrictedByOwnerFilter>;
  order?: Maybe<RestrictedByOwnerOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryAggregateRestrictedByOwnerArgs = {
  filter?: Maybe<RestrictedByOwnerFilter>;
};

export enum TestHasFilter {
  Test = 'test',
}

export enum TestOrderable {
  Test = 'test',
}

export type PolygonGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
  contains?: Maybe<ContainsFilter>;
  intersects?: Maybe<IntersectsFilter>;
};

export type GenerateQueryParams = {
  get?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Boolean']>;
  aggregate?: Maybe<Scalars['Boolean']>;
};

export type AddRestrictedByRolePayload = {
  __typename?: 'AddRestrictedByRolePayload';
  restrictedByRole?: Maybe<Array<Maybe<RestrictedByRole>>>;
  numUids?: Maybe<Scalars['Int']>;
};

export type AddRestrictedByRolePayloadRestrictedByRoleArgs = {
  filter?: Maybe<RestrictedByRoleFilter>;
  order?: Maybe<RestrictedByRoleOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddTestPayload = {
  __typename?: 'AddTestPayload';
  test?: Maybe<Array<Maybe<Test>>>;
  numUids?: Maybe<Scalars['Int']>;
};

export type AddTestPayloadTestArgs = {
  filter?: Maybe<TestFilter>;
  order?: Maybe<TestOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum RestrictedByRoleHasFilter {
  Text = 'text',
}

export enum UserOrderable {
  Username = 'username',
  DisplayName = 'displayName',
  Picture = 'picture',
}

export type AddRestrictedByOwnerInput = {
  text?: Maybe<Scalars['String']>;
  owner: UserRef;
};

export type AddUserInput = {
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  filter: UserFilter;
  set?: Maybe<UserPatch>;
  remove?: Maybe<UserPatch>;
};

export type UserPatch = {
  displayName?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTest?: Maybe<AddTestPayload>;
  updateTest?: Maybe<UpdateTestPayload>;
  deleteTest?: Maybe<DeleteTestPayload>;
  addUser?: Maybe<AddUserPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  addRestrictedByRole?: Maybe<AddRestrictedByRolePayload>;
  updateRestrictedByRole?: Maybe<UpdateRestrictedByRolePayload>;
  deleteRestrictedByRole?: Maybe<DeleteRestrictedByRolePayload>;
  addRestrictedByOwner?: Maybe<AddRestrictedByOwnerPayload>;
  updateRestrictedByOwner?: Maybe<UpdateRestrictedByOwnerPayload>;
  deleteRestrictedByOwner?: Maybe<DeleteRestrictedByOwnerPayload>;
};

export type MutationAddTestArgs = {
  input: Array<AddTestInput>;
};

export type MutationUpdateTestArgs = {
  input: UpdateTestInput;
};

export type MutationDeleteTestArgs = {
  filter: TestFilter;
};

export type MutationAddUserArgs = {
  input: Array<AddUserInput>;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
  filter: UserFilter;
};

export type MutationAddRestrictedByRoleArgs = {
  input: Array<AddRestrictedByRoleInput>;
};

export type MutationUpdateRestrictedByRoleArgs = {
  input: UpdateRestrictedByRoleInput;
};

export type MutationDeleteRestrictedByRoleArgs = {
  filter: RestrictedByRoleFilter;
};

export type MutationAddRestrictedByOwnerArgs = {
  input: Array<AddRestrictedByOwnerInput>;
};

export type MutationUpdateRestrictedByOwnerArgs = {
  input: UpdateRestrictedByOwnerInput;
};

export type MutationDeleteRestrictedByOwnerArgs = {
  filter: RestrictedByOwnerFilter;
};

export enum DgraphIndex {
  Int = 'int',
  Int64 = 'int64',
  Float = 'float',
  Bool = 'bool',
  Hash = 'hash',
  Exact = 'exact',
  Term = 'term',
  Fulltext = 'fulltext',
  Trigram = 'trigram',
  Regexp = 'regexp',
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Geo = 'geo',
}

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  user?: Maybe<Array<Maybe<User>>>;
  numUids?: Maybe<Scalars['Int']>;
};

export type AddUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteRestrictedByOwnerPayload = {
  __typename?: 'DeleteRestrictedByOwnerPayload';
  restrictedByOwner?: Maybe<Array<Maybe<RestrictedByOwner>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type DeleteRestrictedByOwnerPayloadRestrictedByOwnerArgs = {
  filter?: Maybe<RestrictedByOwnerFilter>;
  order?: Maybe<RestrictedByOwnerOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  user?: Maybe<Array<Maybe<User>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type DeleteUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type RestrictedByRoleAggregateResult = {
  __typename?: 'RestrictedByRoleAggregateResult';
  count?: Maybe<Scalars['Int']>;
  textMin?: Maybe<Scalars['String']>;
  textMax?: Maybe<Scalars['String']>;
};

export type TestFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  has?: Maybe<TestHasFilter>;
  and?: Maybe<Array<Maybe<TestFilter>>>;
  or?: Maybe<Array<Maybe<TestFilter>>>;
  not?: Maybe<TestFilter>;
};

export type TestOrder = {
  asc?: Maybe<TestOrderable>;
  desc?: Maybe<TestOrderable>;
  then?: Maybe<TestOrder>;
};
