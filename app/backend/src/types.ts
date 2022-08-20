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

export type DbTeam = Indexable & {
  teamName: string
};

export type DbMatch = Indexable & {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

export type FullMatch = DbMatch & {
  teamHome: {
    teamName: string
  };

  teamAway: {
    teamName: string
  }
};
