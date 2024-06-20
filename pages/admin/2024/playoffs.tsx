import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { IPlayoffMatchPlatform } from '@/models/PlayoffMatch';
import { ITeamPlatform } from '@/models/Team';

Modal.setAppElement('#__next');

const PlayoffMatches = () => {
  const router = useRouter();
  const [matches, setMatches] = useState<IPlayoffMatchPlatform[]>([]);
  const [teams, setTeams] = useState<ITeamPlatform[]>([]);
  const [newMatch, setNewMatch] = useState<IPlayoffMatchPlatform | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<IPlayoffMatchPlatform | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
      const res = await fetch('/api/playoff-matches');
      const { data } = await res.json();
      setMatches(data || []);
    } catch (error) {
      console.error('Error fetching playoff matches:', error);
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

  const handleAddMatch = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newMatch) return;
    try {
      const res = await fetch('/api/playoff-matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMatch),
      });
      if (res.ok) {
        fetchMatches();
        setNewMatch(null);
        setIsAddModalOpen(false);
      } else {
        console.error('Error adding match:', await res.json());
      }
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  const handleEditMatch = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!selectedMatch) return;
    try {
      const res = await fetch(`/api/playoff-matches?id=${selectedMatch._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...selectedMatch,
            local: selectedMatch.local?._id || null,
            visitor: selectedMatch.visitor?._id || null,
        }),
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

  const handleDeleteMatch = async (id: string) => {
    try {
      const res = await fetch(`/api/playoff-matches?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchMatches();
      } else {
        console.error('Error deleting match:', await res.json());
      }
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  const openAddModal = () => {
    setNewMatch({
      _id: '',
      round: '',
      local: null,
      visitor: null,
      localScore: 0,
      visitorScore: 0,
      time: '',
      field: '',
      played: false,
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (match: IPlayoffMatchPlatform) => {
    setSelectedMatch(match);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Partidos de Playoffs</h1>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mb-4"
          onClick={openAddModal}
        >
          Añadir Partido
        </button>
        <div>
          <h2 className="text-2xl font-bold mb-4">Listado de Partidos</h2>
          <ul>
            {matches.map((match) => (
              <li key={match._id} className="mb-2 p-2 border rounded bg-gray-50">
                <p><strong>Ronda:</strong> {match.round}</p>
                <p><strong>Local:</strong> {match.local ? match.local.color : 'Por definir'}</p>
                <p><strong>Visitante:</strong> {match.visitor ? match.visitor.color : 'Por definir'}</p>
                <p><strong>Horario:</strong> {match.time}</p>
                <p><strong>Campo:</strong> {match.field}</p>
                <button
                  className="mt-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                  onClick={() => openEditModal(match)}
                >
                  Editar
                </button>
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

      {/* Modal para añadir partido */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Añadir Partido de Playoffs</h2>
        {newMatch && (
          <form onSubmit={handleAddMatch}>
            <div className="mb-4">
              <label className="block text-gray-700">Ronda</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded"
                value={newMatch.round}
                onChange={(e) => setNewMatch({ ...newMatch, round: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Local</label>
              <select
                className="mt-1 p-2 w-full border rounded"
                value={newMatch.local || ''}
                onChange={(e) => setNewMatch({ ...newMatch, local: e.target.value })}
              >
                <option value="">Por definir</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>{team.color}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Visitante</label>
              <select
                className="mt-1 p-2 w-full border rounded"
                value={newMatch.visitor || ''}
                onChange={(e) => setNewMatch({ ...newMatch, visitor: e.target.value })}
              >
                <option value="">Por definir</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>{team.color}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Horario</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded"
                value={newMatch.time}
                onChange={(e) => setNewMatch({ ...newMatch, time: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Campo</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded"
                value={newMatch.field}
                onChange={(e) => setNewMatch({ ...newMatch, field: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Añadir Partido
            </button>
          </form>
        )}
      </Modal>

      {/* Modal para editar partido */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Partido de Playoffs</h2>
        {selectedMatch && (
          <form onSubmit={handleEditMatch}>
            <div className="mb-4">
              <label className="block text-gray-700">Ronda</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded"
                value={selectedMatch.round}
                onChange={(e) => setSelectedMatch({ ...selectedMatch, round: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Local</label>
              <select
                className="mt-1 p-2 w-full border rounded"
                value={selectedMatch.local?._id || ''}
                onChange={(e) => setSelectedMatch({ ...selectedMatch, local: e.target.value })}
              >
                <option value="">Por definir</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>{team.color}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Visitante</label>
              <select
                className="mt-1 p-2 w-full border rounded"
                value={selectedMatch.visitor?._id || ''}
                onChange={(e) => setSelectedMatch({ ...selectedMatch, visitor: e.target.value })}
              >
                <option value="">Por definir</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>{team.color}</option>
                ))}
              </select>
            </div>
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

export default PlayoffMatches;

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
