// utils/schedule.ts
import { ITeamPlatform } from '@/models';
import Match from '@/models/Match';

export const generateRoundRobin = async (teams: ITeamPlatform[]) => {
  const matches = [];
  const numTeams = teams.length;

  // Round-robin algorithm
  for (let round = 0; round < numTeams - 1; round++) {
    for (let i = 0; i < numTeams / 2; i++) {
      const local = teams[i];
      const visitor = teams[numTeams - 1 - i];

      matches.push({
        local: local._id,
        visitor: visitor._id,
        localScore: 0,
        visitorScore: 0,
        time: '',
        field: '',
        played: false,
      });
    }
    // Rotate teams for next round
    // teams.splice(1, 0, teams.pop());
  }

  // Save matches to database
  await Match.insertMany(matches);
};
