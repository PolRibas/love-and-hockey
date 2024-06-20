// pages/api/teams/[id].ts
import dbConnect from '@/lib/mongodb';
import Team from '@/models/Team';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if(!id) {
          const teams = await Team.find({});
          if (!teams) {
            return res.status(404).json({ success: false });
          }
          res.status(200).json({ success: true, data: teams });
        }
        const team = await Team.findById(id);
        if (!team) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: team });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        console.log('req.body', req.body)
        const team = await Team.create(req.body);
        res.status(201).json({ success: true, data: team });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const team = await Team.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!team) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: team });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedTeam = await Team.deleteOne({ _id: id });
        if (!deletedTeam) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
