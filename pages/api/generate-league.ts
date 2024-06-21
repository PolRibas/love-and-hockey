// pages/api/generate-league.ts
import dbConnect from '@/lib/mongodb';
import Match from '@/models/Match';
import Team from '@/models/Team';
import { NextApiRequest, NextApiResponse } from 'next';


const generateRoundRobin = (teams: any[]) => {
    const matches: { local: any; visitor: any; localScore: number; visitorScore: number; time: string; field: string; played: boolean; }[] = [];
    const numTeams = teams.length;
    if (numTeams < 2) return matches; // No hay suficientes equipos para generar partidos
  
    for (let round = 0; round < numTeams - 1; round++) {
      for (let i = 0; i < numTeams / 2; i++) {
        const local = teams[i];
        const visitor = teams[numTeams - 1 - i];
  
        matches.push({
          local: local._id,
          visitor: visitor._id,
          localScore: 0,
          visitorScore: 0,
          time: new Date().toISOString(),
          field: 'Campo 1',
          played: false,
        });
      }
      teams.splice(1, 0, teams.pop()); // Rotar los equipos
    }
  
    return matches;
  };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const teams = await Team.find({});
        const matches = await generateRoundRobin(teams);
        await Match.insertMany(matches);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
