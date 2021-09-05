export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type UserEmail = {
  __typename?: 'UserEmail';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  label: Scalars['String'];
  email: Scalars['String'];
  isLogin: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
};


export type UserEmergencyContact = {
  __typename?: 'UserEmergencyContact';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  name: Scalars['String'];
  surname: Scalars['String'];
  patronymic: Scalars['String'];
  phone: Scalars['String'];
  relation: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
};

export type UserHoliday = {
  __typename?: 'UserHoliday';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  start: Scalars['Date'];
  end: Scalars['Date'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
};

export type UserMessenger = {
  __typename?: 'UserMessenger';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  label: Scalars['String'];
  nickname: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
};

export type UserPhone = {
  __typename?: 'UserPhone';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  label: Scalars['String'];
  phone: Scalars['String'];
  isLogin: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
};

export type UserSocialNetwork = {
  __typename?: 'UserSocialNetwork';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  label: Scalars['String'];
  link: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
};

export type Document = {
  __typename?: 'Document';
  _id: Scalars['ID'];
  fileName: Scalars['String'];
  bucketName: Scalars['String'];
  documentName: Scalars['String'];
  ownerId: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  linkExpiringAt?: Maybe<Scalars['Date']>;
};

export type UserPassport = {
  __typename?: 'UserPassport';
  serial?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  dateOfIssue?: Maybe<Scalars['Date']>;
  departmentCode?: Maybe<Scalars['String']>;
  issuedBy?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  name: Scalars['String'];
  surname: Scalars['String'];
  patronymic: Scalars['String'];
  avatarId?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['Float']>;
  alias: Scalars['String'];
  divisionId?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  birthday?: Maybe<Scalars['Date']>;
  employmentAt?: Maybe<Scalars['Date']>;
  dismissalAt?: Maybe<Scalars['Date']>;
  hobbies?: Maybe<Scalars['String']>;
  professionalHobbies?: Maybe<Scalars['String']>;
  kpp?: Maybe<Scalars['String']>;
  correspondentAccount?: Maybe<Scalars['String']>;
  checkingAccount?: Maybe<Scalars['String']>;
  snils?: Maybe<Scalars['String']>;
  inn?: Maybe<Scalars['String']>;
  bik?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
  emails: Array<Maybe<UserEmail>>;
  emergencyContacts: Array<Maybe<UserEmergencyContact>>;
  holidays: Array<Maybe<UserHoliday>>;
  messengers: Array<Maybe<UserMessenger>>;
  phones: Array<Maybe<UserPhone>>;
  socialNetworks: Array<Maybe<UserSocialNetwork>>;
  avatar?: Maybe<Document>;
  documents: Array<Maybe<Document>>;
  passport?: Maybe<UserPassport>;
  division?: Maybe<Division>;
  role?: Maybe<Role>;
  tokens: Array<Maybe<UserToken>>;
  payout: Payout;
};


export type UserPayoutArgs = {
  period: Scalars['String'];
};

export type CheckUserLoginResult = {
  __typename?: 'CheckUserLoginResult';
  user: User;
  loginPhone: UserPhone;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  user: User;
  accessToken: Scalars['String'];
};

export type Division = {
  __typename?: 'Division';
  _id: Scalars['ID'];
  departmentId: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
  department?: Maybe<Department>;
  chefId?: Maybe<Scalars['String']>;
  users: Array<Maybe<User>>;
  chef?: Maybe<User>;
};

export type Department = {
  __typename?: 'Department';
  _id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
  divisions: Array<Maybe<Division>>;
};

export type Role = {
  __typename?: 'Role';
  _id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
  users: Array<Maybe<User>>;
};

export type UserLabel = {
  __typename?: 'UserLabel';
  _id: Scalars['ID'];
  type: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
};

export type UserToken = {
  __typename?: 'UserToken';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  origin: Scalars['String'];
  userAgent: Scalars['String'];
  token: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
};

export type Permission = {
  __typename?: 'Permission';
  _id: Scalars['ID'];
  pathname: Scalars['String'];
  readersIds: Array<Maybe<Scalars['String']>>;
  writersIds: Array<Maybe<Scalars['String']>>;
  allIsReaders?: Maybe<Scalars['Boolean']>;
  allIsWriters?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
  readers: Array<Maybe<User>>;
  writers: Array<Maybe<User>>;
  iAmIsReader: Scalars['Boolean'];
  iAmIsWriter: Scalars['Boolean'];
};

export type Application = {
  __typename?: 'Application';
  _id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  iconId?: Maybe<Scalars['String']>;
};

export type Payout = {
  __typename?: 'Payout';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  prepaid?: Maybe<Scalars['String']>;
  cellular?: Maybe<Scalars['String']>;
  otherPayouts?: Maybe<Scalars['String']>;
  prize?: Maybe<Scalars['String']>;
  compensation?: Maybe<Scalars['String']>;
  overtime?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['String']>;
  firstHalf?: Maybe<Scalars['String']>;
  secondHalf?: Maybe<Scalars['String']>;
  toIssue?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  period: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  user: User;
};

export type PayoutRule = {
  __typename?: 'PayoutRule';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  readFields: Array<Maybe<Scalars['String']>>;
  writeFields: Array<Maybe<Scalars['String']>>;
  deleted: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type DepartmentPayoutManager = {
  __typename?: 'DepartmentPayoutManager';
  _id: Scalars['ID'];
  departmentId: Scalars['String'];
  userId: Scalars['String'];
  readFields: Array<Maybe<Scalars['String']>>;
  writeFields: Array<Maybe<Scalars['String']>>;
  deleted: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  user: User;
  department: Department;
};

export type StackDocument = {
  __typename?: 'StackDocument';
  _id: Scalars['ID'];
  documentName?: Maybe<Scalars['String']>;
  fileName: Scalars['String'];
  bucketName: Scalars['String'];
  folderName?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  link: Scalars['String'];
  createdAt: Scalars['Date'];
};

export type Query = {
  __typename?: 'Query';
  department?: Maybe<Department>;
  departments: Array<Maybe<Department>>;
  division?: Maybe<Division>;
  divisions: Array<Maybe<Division>>;
  role?: Maybe<Role>;
  roles: Array<Maybe<Role>>;
  userPhones: Array<Maybe<UserPhone>>;
  userEmails: Array<Maybe<UserEmail>>;
  userMessengers: Array<Maybe<UserMessenger>>;
  userSocialNetworks: Array<Maybe<UserSocialNetwork>>;
  userEmergencyContacts: Array<Maybe<UserEmergencyContact>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
  userHolidays: Array<Maybe<UserHoliday>>;
  userTokens: Array<Maybe<UserToken>>;
  userLabels: Array<Maybe<UserLabel>>;
  permissions: Array<Permission>;
  permission: Permission;
  userDocuments: Array<StackDocument>;
  authApplications: Array<Application>;
  authApplication: Application;
  payouts: Array<Maybe<Payout>>;
  payoutRules: Array<Maybe<PayoutRule>>;
  payoutRule?: Maybe<PayoutRule>;
  departmentPayoutManagers: Array<DepartmentPayoutManager>;
  whoAmI: User;
};


export type QueryDepartmentArgs = {
  payload?: Maybe<DepartmentInput>;
};


export type QueryDivisionArgs = {
  payload?: Maybe<DivisionInput>;
};


export type QueryDivisionsArgs = {
  payload?: Maybe<DivisionsInput>;
};


export type QueryRoleArgs = {
  payload?: Maybe<RoleInput>;
};


export type QueryUserPhonesArgs = {
  userId: Scalars['String'];
};


export type QueryUserEmailsArgs = {
  userId: Scalars['String'];
};


export type QueryUserMessengersArgs = {
  userId: Scalars['String'];
};


export type QueryUserSocialNetworksArgs = {
  userId: Scalars['String'];
};


export type QueryUserEmergencyContactsArgs = {
  userId: Scalars['String'];
};


export type QueryUserArgs = {
  payload?: Maybe<UserInput>;
};


export type QueryUsersArgs = {
  payload?: Maybe<UsersInput>;
};


export type QueryUserHolidaysArgs = {
  userId: Scalars['String'];
};


export type QueryUserTokensArgs = {
  userId: Scalars['String'];
};


export type QueryUserLabelsArgs = {
  type: Scalars['String'];
};


export type QueryPermissionArgs = {
  pathname: Scalars['String'];
};


export type QueryUserDocumentsArgs = {
  userId: Scalars['String'];
};


export type QueryAuthApplicationArgs = {
  payload: ApplicationInput;
};


export type QueryPayoutsArgs = {
  payload: PayoutsInput;
};


export type QueryPayoutRuleArgs = {
  payload: PayoutRuleInput;
};


export type QueryDepartmentPayoutManagersArgs = {
  payload?: Maybe<DepartmentPayoutManagerInput>;
};

export type DepartmentInput = {
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type DivisionInput = {
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type DivisionsInput = {
  departmentId?: Maybe<Scalars['String']>;
};

export type RoleInput = {
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UserInput = {
  _id?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
};

export type UsersInput = {
  roleId?: Maybe<Scalars['String']>;
  divisionId?: Maybe<Scalars['String']>;
};

export type ApplicationInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type PayoutsInput = {
  period?: Maybe<Scalars['String']>;
};

export type PayoutRuleInput = {
  userId?: Maybe<Scalars['String']>;
};

export type DepartmentPayoutManagerInput = {
  userId?: Maybe<Scalars['String']>;
  departmentId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDepartment: Department;
  updateDepartment: Department;
  deleteDepartment: Department;
  createDivision: Division;
  updateDivision: Division;
  deleteDivision: Division;
  createRole: Role;
  updateRole: Role;
  deleteRole: Role;
  createUserPhone: UserPhone;
  updateUserPhone: UserPhone;
  deleteUserPhone: UserPhone;
  createUserEmail: UserEmail;
  updateUserEmail: UserEmail;
  deleteUserEmail: UserEmail;
  createUserMessenger: UserMessenger;
  updateUserMessenger: UserMessenger;
  deleteUserMessenger: UserMessenger;
  createUserSocialNetwork: UserSocialNetwork;
  updateUserSocialNetwork: UserSocialNetwork;
  deleteUserSocialNetwork: UserSocialNetwork;
  createUserEmergencyContact: UserEmergencyContact;
  updateUserEmergencyContact: UserEmergencyContact;
  deleteUserEmergencyContact: UserEmergencyContact;
  createUser: User;
  updateUser: User;
  deleteUser: User;
  creteUserHoliday: UserHoliday;
  updateUserHoliday: UserHoliday;
  deleteUserHoliday: UserHoliday;
  createUserLabel: UserLabel;
  updatePermission: Permission;
  createAuthApplication: Application;
  deleteAuthApplication: Application;
  createPayout: Payout;
  updatePayout: Payout;
  deletePayout: Payout;
  createPayoutRule: PayoutRule;
  updatePayoutRule: PayoutRule;
  deletePayoutRule: PayoutRule;
  createDepartmentPayoutManager: DepartmentPayoutManager;
  updateDepartmentPayoutManager: DepartmentPayoutManager;
  deleteDepartmentPayoutManager: DepartmentPayoutManager;
  checkUserLogin?: Maybe<CheckUserLoginResult>;
  login: LoginResult;
};


export type MutationCreateDepartmentArgs = {
  payload: CreateDepartmentDto;
};


export type MutationUpdateDepartmentArgs = {
  payload: UpdateDepartmentDto;
};


export type MutationDeleteDepartmentArgs = {
  _id: Scalars['String'];
};


export type MutationCreateDivisionArgs = {
  payload: CreateDivisionDto;
};


export type MutationUpdateDivisionArgs = {
  payload: UpdateDivisionDto;
};


export type MutationDeleteDivisionArgs = {
  _id: Scalars['String'];
};


export type MutationCreateRoleArgs = {
  payload: CreateRoleDto;
};


export type MutationUpdateRoleArgs = {
  payload: UpdateRoleDto;
};


export type MutationDeleteRoleArgs = {
  _id: Scalars['String'];
};


export type MutationCreateUserPhoneArgs = {
  payload: CreateUserPhoneDto;
};


export type MutationUpdateUserPhoneArgs = {
  payload: UpdateUserPhoneDto;
};


export type MutationDeleteUserPhoneArgs = {
  _id: Scalars['String'];
};


export type MutationCreateUserEmailArgs = {
  payload: CreateUserEmailDto;
};


export type MutationUpdateUserEmailArgs = {
  payload: UpdateUserEmailDto;
};


export type MutationDeleteUserEmailArgs = {
  _id: Scalars['String'];
};


export type MutationCreateUserMessengerArgs = {
  payload: CreateUserMessengerDto;
};


export type MutationUpdateUserMessengerArgs = {
  payload: UpdateUserMessengerDto;
};


export type MutationDeleteUserMessengerArgs = {
  _id: Scalars['String'];
};


export type MutationCreateUserSocialNetworkArgs = {
  payload: CreateUserSocialNetworkDto;
};


export type MutationUpdateUserSocialNetworkArgs = {
  payload: UpdateUserSocialNetworkDto;
};


export type MutationDeleteUserSocialNetworkArgs = {
  _id: Scalars['String'];
};


export type MutationCreateUserEmergencyContactArgs = {
  payload: CreateUserEmergencyContactDto;
};


export type MutationUpdateUserEmergencyContactArgs = {
  payload: UpdateUserEmergencyContactDto;
};


export type MutationDeleteUserEmergencyContactArgs = {
  _id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  payload: CreateUserDto;
};


export type MutationUpdateUserArgs = {
  payload: UpdateUserDto;
};


export type MutationDeleteUserArgs = {
  _id: Scalars['String'];
};


export type MutationCreteUserHolidayArgs = {
  payload: CreateUserHolidayDto;
};


export type MutationUpdateUserHolidayArgs = {
  payload: UpdateUserHolidayDto;
};


export type MutationDeleteUserHolidayArgs = {
  _id: Scalars['String'];
};


export type MutationCreateUserLabelArgs = {
  payload: CreateUserLabelDto;
};


export type MutationUpdatePermissionArgs = {
  payload: UpdatePermissionDto;
};


export type MutationCreateAuthApplicationArgs = {
  payload: CreateApplicationDto;
};


export type MutationDeleteAuthApplicationArgs = {
  _id: Scalars['String'];
};


export type MutationCreatePayoutArgs = {
  payload: CreatePayoutDto;
};


export type MutationUpdatePayoutArgs = {
  payload: UpdatePayoutDto;
};


export type MutationDeletePayoutArgs = {
  _id: Scalars['String'];
};


export type MutationCreatePayoutRuleArgs = {
  payload: CreatePayoutRuleDto;
};


export type MutationUpdatePayoutRuleArgs = {
  payload: UpdatePayoutRuleDto;
};


export type MutationDeletePayoutRuleArgs = {
  _id: Scalars['String'];
};


export type MutationCreateDepartmentPayoutManagerArgs = {
  payload: CreateDepartmentPayoutManagerDto;
};


export type MutationUpdateDepartmentPayoutManagerArgs = {
  payload: UpdateDepartmentPayoutManagerDto;
};


export type MutationDeleteDepartmentPayoutManagerArgs = {
  _id: Scalars['String'];
};


export type MutationCheckUserLoginArgs = {
  login: Scalars['String'];
};


export type MutationLoginArgs = {
  payload: LoginInput;
};

export type CreateDepartmentDto = {
  name: Scalars['String'];
};

export type UpdateDepartmentDto = {
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type CreateDivisionDto = {
  departmentId: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateDivisionDto = {
  _id: Scalars['String'];
  departmentId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  chefId?: Maybe<Scalars['String']>;
};

export type CreateRoleDto = {
  name: Scalars['String'];
};

export type UpdateRoleDto = {
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type CreateUserPhoneDto = {
  userId: Scalars['String'];
  label: Scalars['String'];
  phone: Scalars['String'];
  isLogin?: Maybe<Scalars['Boolean']>;
};

export type UpdateUserPhoneDto = {
  _id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  isLogin?: Maybe<Scalars['Boolean']>;
};

export type CreateUserEmailDto = {
  userId: Scalars['String'];
  label: Scalars['String'];
  email: Scalars['String'];
  isLogin?: Maybe<Scalars['Boolean']>;
};

export type UpdateUserEmailDto = {
  _id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isLogin?: Maybe<Scalars['Boolean']>;
};

export type CreateUserMessengerDto = {
  userId: Scalars['String'];
  label: Scalars['String'];
  nickname: Scalars['String'];
};

export type UpdateUserMessengerDto = {
  _id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
};

export type CreateUserSocialNetworkDto = {
  userId: Scalars['String'];
  label: Scalars['String'];
  link: Scalars['String'];
};

export type UpdateUserSocialNetworkDto = {
  _id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type CreateUserEmergencyContactDto = {
  userId: Scalars['String'];
  name: Scalars['String'];
  surname: Scalars['String'];
  patronymic: Scalars['String'];
  phone: Scalars['String'];
  relation: Scalars['String'];
};

export type UpdateUserEmergencyContactDto = {
  _id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  patronymic?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  relation?: Maybe<Scalars['String']>;
};

export type CreateUserDto = {
  name: Scalars['String'];
  surname: Scalars['String'];
  patronymic: Scalars['String'];
  avatarId?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['Float']>;
  alias: Scalars['String'];
  divisionId?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  employmentAt?: Maybe<Scalars['Date']>;
  dismissalAt?: Maybe<Scalars['Date']>;
  hobbies?: Maybe<Scalars['String']>;
  professionalHobbies?: Maybe<Scalars['String']>;
  kpp?: Maybe<Scalars['String']>;
  correspondentAccount?: Maybe<Scalars['String']>;
  checkingAccount?: Maybe<Scalars['String']>;
  snils?: Maybe<Scalars['String']>;
  inn?: Maybe<Scalars['String']>;
  bik?: Maybe<Scalars['String']>;
};

export type UpdateUserDto = {
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  patronymic?: Maybe<Scalars['String']>;
  avatarId?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['Float']>;
  alias?: Maybe<Scalars['String']>;
  divisionId?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  employmentAt?: Maybe<Scalars['Date']>;
  dismissalAt?: Maybe<Scalars['Date']>;
  hobbies?: Maybe<Scalars['String']>;
  professionalHobbies?: Maybe<Scalars['String']>;
  kpp?: Maybe<Scalars['String']>;
  correspondentAccount?: Maybe<Scalars['String']>;
  checkingAccount?: Maybe<Scalars['String']>;
  snils?: Maybe<Scalars['String']>;
  inn?: Maybe<Scalars['String']>;
  bik?: Maybe<Scalars['String']>;
  passport?: Maybe<UpdateUserPassportDto>;
};

export type UpdateUserPassportDto = {
  serial?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  dateOfIssue?: Maybe<Scalars['Date']>;
  departmentCode?: Maybe<Scalars['String']>;
  issuedBy?: Maybe<Scalars['String']>;
};

export type CreateUserHolidayDto = {
  userId: Scalars['String'];
  start: Scalars['Date'];
  end: Scalars['Date'];
};

export type UpdateUserHolidayDto = {
  _id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Date']>;
  end?: Maybe<Scalars['Date']>;
};

export type CreateUserLabelDto = {
  type: Scalars['String'];
  name: Scalars['String'];
};

export type UpdatePermissionDto = {
  _id: Scalars['String'];
  pathname?: Maybe<Scalars['String']>;
  readersIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  writersIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateApplicationDto = {
  name: Scalars['String'];
  url: Scalars['String'];
  iconId?: Maybe<Scalars['String']>;
};

export type CreatePayoutDto = {
  userId: Scalars['String'];
  prepaid?: Maybe<Scalars['String']>;
  cellular?: Maybe<Scalars['String']>;
  otherPayouts?: Maybe<Scalars['String']>;
  prize?: Maybe<Scalars['String']>;
  compensation?: Maybe<Scalars['String']>;
  overtime?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['String']>;
  firstHalf?: Maybe<Scalars['String']>;
  secondHalf?: Maybe<Scalars['String']>;
  toIssue?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  period: Scalars['String'];
};

export type UpdatePayoutDto = {
  _id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  prepaid?: Maybe<Scalars['String']>;
  cellular?: Maybe<Scalars['String']>;
  otherPayouts?: Maybe<Scalars['String']>;
  prize?: Maybe<Scalars['String']>;
  compensation?: Maybe<Scalars['String']>;
  overtime?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['String']>;
  firstHalf?: Maybe<Scalars['String']>;
  secondHalf?: Maybe<Scalars['String']>;
  toIssue?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
};

export type CreatePayoutRuleDto = {
  userId: Scalars['String'];
  readFields: Array<Scalars['String']>;
  writeFields: Array<Scalars['String']>;
};

export type UpdatePayoutRuleDto = {
  _id: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  readFields: Array<Maybe<Scalars['String']>>;
  writeFields: Array<Maybe<Scalars['String']>>;
};

export type CreateDepartmentPayoutManagerDto = {
  userId: Scalars['String'];
  departmentId: Scalars['String'];
  readFields: Array<Maybe<Scalars['String']>>;
  writeFields: Array<Maybe<Scalars['String']>>;
};

export type UpdateDepartmentPayoutManagerDto = {
  _id: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  departmentId?: Maybe<Scalars['String']>;
  readFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  writeFields?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LoginInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};
