export type Indexable = {
  id: number
};

export type DbUser = Indexable & {
  username: string,
  role: string,
  email: string,
  password: string
};

export type TUser = Omit<DbUser, 'password'>;

export type Login = Omit<DbUser, 'id' | 'role' | 'username'>;
