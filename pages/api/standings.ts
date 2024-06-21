// pages/api/standings.ts
import dbConnect from '@/lib/mongodb';
import Match from '@/models/Match';
import Team from '@/models/Team';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const matches = await Match.find({ played: true }).populate('local visitor');
    const teams = await Team.find({});

    const standings = teams.map(team => {
      const stats = {
        team: team.color,
        wins: 0,
        losses: 0,
        draws: 0,
        points: 0,
        scored: 0,
        conceded: 0,
      };

      matches.forEach(match => {
        if (match.local.equals(team._id) || match.visitor.equals(team._id)) {
          const isLocal = match.local.equals(team._id);
          const scored = isLocal ? match.localScore : match.visitorScore;
          const conceded = isLocal ? match.visitorScore : match.localScore;

          stats.scored += scored;
          stats.conceded += conceded;

          if (scored > conceded) {
            stats.wins += 1;
            stats.points += 3;
          } else if (scored < conceded) {
            stats.losses += 1;
          } else {
            stats.draws += 1;
            stats.points += 1;
          }
        }
      });


      return stats;
    });

    res.status(200).json({
      success: true, data: standings.sort((a, b) => {
        if (a.points === b.points) {
          const deferenceA = a.scored - a.conceded;
          const differenceB = b.scored - b.conceded;
          if (deferenceA !== differenceB) {
            return differenceB - deferenceA;
          }
          return b.scored - a.scored
        }
        return b.points - a.points;
      })
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}
