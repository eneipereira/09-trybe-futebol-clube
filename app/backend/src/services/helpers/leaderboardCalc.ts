import { DbMatch, Stats, TeamType } from '../../types';

export const calculateTotalVDL = async (matches: DbMatch[], type: string): Promise<Stats> => {
  let totalVictories = 0; let totalDraws = 0; let totalLosses = 0;

  const types: TeamType = type === 'homeTeam'
    ? ['homeTeamGoals', 'awayTeamGoals']
    : ['awayTeamGoals', 'homeTeamGoals'];

  matches.forEach((match) => {
    if (match[types[0]] > match[types[1]]) totalVictories += 1;

    if (match[types[0]] < match[types[1]]) totalLosses += 1;

    if (match[types[0]] === match[types[1]]) totalDraws += 1;
  });

  return { totalVictories, totalDraws, totalLosses };
};

export const calculateTotalPoints = async (stats: Stats) => {
  const total = stats.totalVictories * 3 + stats.totalDraws;

  return total;
};

export const calculateTotalGoals = async (matches: DbMatch[], type: string) => {
  let goalsFavor = 0; let goalsOwn = 0; let goalsBalance = 0;

  const types: TeamType = type === 'homeTeam'
    ? ['homeTeamGoals', 'awayTeamGoals']
    : ['awayTeamGoals', 'homeTeamGoals'];

  matches.forEach((match) => {
    goalsFavor += match[types[0]];
    goalsOwn += match[types[1]];
  });

  goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
};

export const calculateEfficiency = async (points: number, games: number) => {
  const efficiency = (points / (games * 3)) * 100;

  return efficiency.toFixed(2);
};
