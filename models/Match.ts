// models/Match.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ITeamPlatform } from './Team';

export interface IMatchPlatform {
    _id: any;
    local: ITeamPlatform['_id'];
    visitor: ITeamPlatform['_id'];
    localScore: number;
    visitorScore: number;
    time: string;
    field: string;
    played: boolean;
}

export interface IMatch extends Document {
    local: ITeamPlatform['_id'];
    visitor: ITeamPlatform['_id'];
    localScore: number;
    visitorScore: number;
    time: string;
    field: string;
    played: boolean;
}

const MatchSchema: Schema = new Schema({
    local: { type: Schema.Types.ObjectId, ref: 'LandH_Team', required: true },
    visitor: { type: Schema.Types.ObjectId, ref: 'LandH_Team', required: true },
    localScore: { type: Number, default: 0 },
    visitorScore: { type: Number, default: 0 },
    time: { type: String, required: true },
    field: { type: String, required: true },
    played: { type: Boolean, default: false }
});

export default mongoose.models.LandH_Match || mongoose.model<IMatch>('LandH_Match', MatchSchema);
