import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import PlayoffMatch from '@/models/PlayoffMatch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        if (id) {
          try {
            const match = await PlayoffMatch.findById(id).populate('local visitor');
            if (!match) {
              return res.status(404).json({ success: false });
            }
            res.status(200).json({ success: true, data: match });
          } catch (error) {
            res.status(400).json({ success: false });
          }
        }
        const matches = await PlayoffMatch.find({}).populate('local visitor');
        res.status(200).json({ success: true, data: matches });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'POST':
      try {
        delete req.body._id;
        const match = await PlayoffMatch.create(req.body);
        res.status(201).json({ success: true, data: match });
      } catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, error });
      }
      break;
    case 'PUT':
      try {
        console.log('req.body', req.body);
        const match = await PlayoffMatch.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!match) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: match });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedMatch = await PlayoffMatch.deleteOne({ _id: id });
        if (!deletedMatch) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Invalid request method' });
      break;
  }
}
