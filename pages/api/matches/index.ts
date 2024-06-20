// pages/api/matches/index.ts
import dbConnect from '@/lib/mongodb';
import Match from '@/models/Match';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const matches = await Match.find({}).populate('local visitor');
        res.status(200).json({ success: true, data: matches });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'POST':
      try {
        const match = await Match.create(req.body);
        res.status(201).json({ success: true, data: match });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'PUT':
      try {
        const match = await Match.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!match) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: match });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
