import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamPlatform {
  _id: any;
  captain: string;
  color: string;
  players: string[];
}

interface ITeam extends Document {
  captain: string;
  color: string;
  players: string[];
}

const TeamSchema: Schema = new Schema({
  captain: { type: String, required: true },
  color: { type: String, required: true },
  players: { type: [String], required: true }
});

export default mongoose.models.LandH_Team || mongoose.model<ITeam>('LandH_Team', TeamSchema);
