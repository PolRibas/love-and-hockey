import mongoose, { Document, Schema } from 'mongoose';
import { ITeamPlatform } from './Team';

export interface IPlayoffMatchPlatform {
    _id: any;
    round: string;
    local: ITeamPlatform['_id'] | null;
    visitor: ITeamPlatform['_id'] | null;
    localScore: number;
    visitorScore: number;
    time: string;
    field: string;
    played: boolean;
}

export interface IPlayoffMatch extends Document {
  round: string;
  local: ITeamPlatform['_id'] | null;
  visitor: ITeamPlatform['_id'] | null;
  localScore: number;
  visitorScore: number;
  time: string;
  field: string;
  played: boolean;
}

const PlayoffMatchSchema: Schema = new Schema({
  round: { type: String, required: true },
  local: { type: Schema.Types.ObjectId, ref: 'LandH_Team', default: null },
  visitor: { type: Schema.Types.ObjectId, ref: 'LandH_Team', default: null },
  localScore: { type: Number, default: 0 },
  visitorScore: { type: Number, default: 0 },
  time: { type: String, required: true },
  field: { type: String, required: true },
  played: { type: Boolean, default: false },
});

export default mongoose.models.LandH_PlayoffMatch || mongoose.model<IPlayoffMatch>('LandH_PlayoffMatch', PlayoffMatchSchema);
