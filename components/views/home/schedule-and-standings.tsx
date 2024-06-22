import { useEffect, useState } from 'react';
import Tabs from './tabs';
import getConfig from 'next/config';


interface Team {
  team: string;
  points: number;
  scored: number;
  conceded: number;
  captain: string;
  color: string;
}

interface Match {
  _id: string;
  local: Team;
  visitor: Team;
  localScore: number;
  visitorScore: number;
  time: string;
  field: string;
  played: boolean;
}

const fetchMatches = async () => {
  try {
    const res = await fetch('/api/matches');
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};

const fetchPlayoffMatches = async () => {
  try {
    const res = await fetch('/api/playoff-matches');
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching playoff matches:', error);
    return [];
  }
};

const fetchClassification = async () => {
  try {
    const res = await fetch('/api/standings');
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching classification:', error);
    return [];
  }
};

export const ScheduleAndStandings = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [playoffMatches, setPlayoffMatches] = useState<Match[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [standings, setStandings] = useState<Team[]>([]);
  const { publicRuntimeConfig } = getConfig();


  useEffect(() => {
    const fetchData = async () => {
      const [matchesData, playoffMatchesData, standingsData] = await Promise.all([
        fetchMatches(),
        fetchPlayoffMatches(),
        fetchClassification(),
      ]);

      setMatches(matchesData);
      setPlayoffMatches(playoffMatchesData);
      setStandings(standingsData);
      if (matchesData.length > 0, playoffMatchesData.length > 0, standingsData.length > 0) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderMatches = (matches: Match[]) => {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      timeZone: publicRuntimeConfig.timeZone || 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const groupedMatches = matches?.reduce((acc: any, match) => {
      const matchTime = formatter.format(new Date(match.time));
      if (!acc[matchTime]) {
        acc[matchTime] = [];
      }
      acc[matchTime].push(match);
      return acc;
    }, {});

    return Object.entries(groupedMatches || {}).map(([time, matches]: any, index) => (
      <div key={index} className="mb-4">
        <h3 className="text-lg font-bold mb-2">{time}</h3>
        {matches.map((match: Match) => (
          <div key={match._id} className="border p-4 mb-2 rounded-lg shadow-sm bg-white">
            <p className="text-sm text-gray-500">Field: {match.field}</p>
            <p className="text-md font-semibold">{match.local?.color || 'pending'} vs {match.visitor?.color || 'pending'}</p>
            <p className="text-sm text-gray-500">
              Score: {match.localScore} - {match.visitorScore}
            </p>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <Tabs tabs={['Calendario', 'Clasificación & Playoffs']} loading={isLoading}>
      <div>
        <h2 className="text-2xl font-bold mb-4">Calendario de Partidos</h2>
        {renderMatches(matches)}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Clasificación</h2>
        <div className="overflow-x-auto w-full mb-8">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Equipo</th>
                <th className="py-2 px-4 text-center">GF</th>
                <th className="py-2 px-4 text-center">GC</th>
                <th className="py-2 px-4 text-center">DG</th>
                <th className="py-2 px-4 text-center">P</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-lg">
                    {index + 1}. {team.team}
                  </td>
                  <td className="px-4 py-2 text-lg text-center">{team.scored}</td>
                  <td className="px-4 py-2 text-lg text-center">{team.conceded}</td>
                  <td className="px-4 py-2 text-lg text-center">{team.scored - team.conceded}</td>
                  <td className="px-4 py-2 text-lg text-center">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-bold mb-4">Partidos de Playoff</h2>
        {renderMatches(playoffMatches)}
      </div>
    </Tabs>

  );
};

export default ScheduleAndStandings;
