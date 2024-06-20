import dbConnect from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    res.status(200).json({ message: 'MongoDB is connected' });
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection failed', error });
  }
}