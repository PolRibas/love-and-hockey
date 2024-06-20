import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Team {
  _id: string;
  captain: string;
  color: string;
  players: string[];
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

const Clasification = () => {
  const router = useRouter();
  const [standings, setStandings] = useState<any[]>([]);
  const [allMatchesPlayed, setAllMatchesPlayed] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin');
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      fetchStandings();
    }
  }, [router]);

  const fetchStandings = async () => {
    try {
      const res = await fetch('/api/standings');
      const { data } = await res.json();
      setStandings(data);

      const matchesRes = await fetch('/api/matches');
      const { data: matches } = await matchesRes.json();
      setAllMatchesPlayed(matches.every((match: Match) => match.played));
    } catch (error) {
      console.error('Error fetching standings:', error);
    }
  };

  const handleGeneratePlayoffs = async () => {
    try {
      await fetch('/api/generate-playoffs', { method: 'POST' });
      router.push('/admin/2024/playoffs');
    } catch (error) {
      console.error('Error generating playoffs:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Playoffs</h1>
        <div>
          <h2 className="text-2xl font-bold mb-4">Clasificación</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-left">Equipo</th>
                <th className="py-2">GF</th>
                <th className="py-2">GC</th>
                <th className="py-2">P</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={team.team} className="text-center border-t">
                  <td className="py-2 text-left">{index + 1}. {team.team}</td>
                  <td className="py-2">{team.scored}</td>
                  <td className="py-2">{team.conceded}</td>
                  <td className="py-2 font-bold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="mt-6 w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={() => router.push('/admin/2024')}
        >
          Volver a 2024
        </button>
      </div>
    </div>
  );
};

export default Clasification;
