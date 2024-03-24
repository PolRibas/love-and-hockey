import { SelectableTeam, teams2024 } from "./teams.2024";

export const gameTypeString = {
  league: 'League',
  semiFinal: 'SemiFinal',
  final: 'Final',
  thirdPlace: 'ThirdPlace',
  fifthPlace: 'FifthPlace',
} as const


export interface GameType {
  local: SelectableTeam | undefined;
  visitor: SelectableTeam | undefined;
  localScore: number;
  visitorScore: number;
  time: string;
  end: boolean
}

export const gameTypeList = [
  gameTypeString.league,
  gameTypeString.league,
  gameTypeString.league,
  gameTypeString.league,
  gameTypeString.league,
  gameTypeString.semiFinal,
  gameTypeString.fifthPlace,
  gameTypeString.thirdPlace,
  gameTypeString.final,
] as const

export const games2024: Array<Array<GameType>> = [
    // Ronda 1
    [
      { local: teams2024[0], visitor: teams2024[1], localScore: 0, visitorScore: 0, time: '17:30', end: false },
      { local: teams2024[2], visitor: teams2024[3], localScore: 0, visitorScore: 0, time: '17:30', end: false },
      { local: teams2024[4], visitor: teams2024[5], localScore: 0, visitorScore: 0, time: '17:45', end: false },
    ],
    // Ronda 2
    [
      { local: teams2024[0], visitor: teams2024[2], localScore: 0, visitorScore: 0, time: '17:45', end: false },
      { local: teams2024[1], visitor: teams2024[4], localScore: 0, visitorScore: 0, time: '18:00', end: false },
      { local: teams2024[3], visitor: teams2024[5], localScore: 0, visitorScore: 0, time: '18:00', end: false },
    ],
    // Ronda 3
    [
      { local: teams2024[0], visitor: teams2024[3], localScore: 0, visitorScore: 0, time: '18:15', end: false },
      { local: teams2024[1], visitor: teams2024[5], localScore: 0, visitorScore: 0, time: '18:15', end: false },
      { local: teams2024[2], visitor: teams2024[4], localScore: 0, visitorScore: 0, time: '18:30', end: false },
    ],
    // Ronda 4
    [
      { local: teams2024[0], visitor: teams2024[4], localScore: 0, visitorScore: 0, time: '18:30', end: false },
      { local: teams2024[1], visitor: teams2024[3], localScore: 0, visitorScore: 0, time: '18:45', end: false },
      { local: teams2024[2], visitor: teams2024[5], localScore: 0, visitorScore: 0, time: '18:45', end: false },
    ],
    // 30 free minutes for other tournaments

    // Ronda 5
    [
      { local: teams2024[0], visitor: teams2024[5], localScore: 0, visitorScore: 0, time: '19:30', end: false },
      { local: teams2024[1], visitor: teams2024[2], localScore: 0, visitorScore: 0, time: '19:30', end: false },
      { local: teams2024[3], visitor: teams2024[4], localScore: 0, visitorScore: 0, time: '19:45', end: false },
    ],
    // SemiFinal
    [
      { local: undefined, visitor: undefined, localScore: 0, visitorScore: 0, time: '20:00', end: false },
      { local: undefined, visitor: undefined, localScore: 0, visitorScore: 0, time: '20:00', end: false },
    ],
    // 5 and 6 positions 
    [
      { local: undefined, visitor: undefined, localScore: 0, visitorScore: 0, time: '20:15', end: false },
    ],
    // 3 and 4 positions 
    [
      { local: undefined, visitor: undefined, localScore: 0, visitorScore: 0, time: '20:15', end: false },
    ],
    // Final
    [
      { local: undefined, visitor: undefined, localScore: 0, visitorScore: 0, time: '20:30', end: false },
    ],
  ];
