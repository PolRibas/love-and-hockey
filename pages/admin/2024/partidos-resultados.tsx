import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { ITeamPlatform } from '@/models';
import { IMatchPlatform } from '@/models/Match';

Modal.setAppElement('#__next');

const PartidosResultados = () => {
  const router = useRouter();
  const [matches, setMatches] = useState<IMatchPlatform[]>([]);
  const [teams, setTeams] = useState<ITeamPlatform[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<IMatchPlatform | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin');
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      fetchMatches();
      fetchTeams();
    }
  }, [router]);

  const fetchMatches = async () => {
    try {
      const res = await fetch('/api/matches');
      const { data } = await res.json();
      setMatches(data || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/teams');
      const { data } = await res.json();
      setTeams(data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleGenerateLeague = async () => {
    try {
      await fetch('/api/generate-league', { method: 'POST' });
      fetchMatches();
    } catch (error) {
      console.error('Error generating league:', error);
    }
  };

  const handleEditMatch = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!selectedMatch) return;
    try {
      const res = await fetch(`/api/matches?id=${selectedMatch._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedMatch),
      });
      if (res.ok) {
        fetchMatches();
        setSelectedMatch(null);
        setIsEditModalOpen(false);
      } else {
        console.error('Error editing match:', await res.json());
      }
    } catch (error) {
      console.error('Error editing match:', error);
    }
  };

  const openEditModal = (match: IMatchPlatform) => {
    setSelectedMatch(match);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Partidos y Resultados</h1>
        {teams.length === 0 && (
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mb-4"
            onClick={handleGenerateLeague}
          >
            Generar Liga
          </button>
        )}
        <div>
          <h2 className="text-2xl font-bold mb-4">Listado de Partidos</h2>
          <ul>
            {matches.map((match) => (
              <li key={match._id} className="mb-2 p-2 border rounded bg-gray-50 cursor-pointer" onClick={() => openEditModal(match)}>
                <p><strong>{match.local.color}</strong> vs <strong>{match.visitor.color}</strong></p>
                <p><strong>Horario:</strong> {match.time}</p>
                <p><strong>Campo:</strong> {match.field}</p>
                <p><strong>Jugado:</strong> {match.played ? 'Sí' : 'No'}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-6 w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={() => router.push('/admin/2024')}
        >
          Volver a 2024
        </button>
      </div>

      {/* Modal para editar partido */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Partido</h2>
        {selectedMatch && (
          <form onSubmit={handleEditMatch}>
            <div className="mb-4">
              <label className="block text-gray-700">Horario</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded"
                value={selectedMatch.time}
                onChange={(e) => setSelectedMatch({ ...selectedMatch, time: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Campo</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded"
                value={selectedMatch.field}
                onChange={(e) => setSelectedMatch({ ...selectedMatch, field: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Resultado</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={selectedMatch.localScore}
                  onChange={(e) => setSelectedMatch({ ...selectedMatch, localScore: parseInt(e.target.value) })}
                  required
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={selectedMatch.visitorScore}
                  onChange={(e) => setSelectedMatch({ ...selectedMatch, visitorScore: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Jugado</label>
              <input
                type="checkbox"
                className="mt-1 p-2"
                checked={selectedMatch.played}
                onChange={(e) => setSelectedMatch({ ...selectedMatch, played: e.target.checked })}
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Guardar Cambios
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default PartidosResultados;

// Estilos para el modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    padding: '20px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

// Añadir los estilos a los modales
Modal.defaultStyles = customStyles;
