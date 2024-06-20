// pages/admin/equipos.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ITeamPlatform } from '@/models';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const Equipos = () => {
  const router = useRouter();
  const [teams, setTeams] = useState<ITeamPlatform[]>([]);
  const [newTeam, setNewTeam] = useState({ captain: '', color: '', players: '' });
  const [selectedTeam, setSelectedTeam] = useState<ITeamPlatform | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin');
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      fetchTeams();
    }
  }, [router]);

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/teams');
      const { data } = await res.json();
      setTeams(data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleAddTeam = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTeam,
          players: newTeam.players.split(',').map(player => player.trim())
        }),
      });
      if (res.ok) {
        fetchTeams();
        setNewTeam({ captain: '', color: '', players: '' });
        setIsAddModalOpen(false);
      } else {
        console.error('Error adding team:', await res.json());
      }
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  const handleEditTeam = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!selectedTeam) return;
    try {
      const res = await fetch(`/api/teams?id=${selectedTeam._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedTeam),
      });
      if (res.ok) {
        fetchTeams();
        setSelectedTeam(null);
        setIsEditModalOpen(false);
      } else {
        console.error('Error editing team:', await res.json());
      }
    } catch (error) {
      console.error('Error editing team:', error);
    }
  };

  const handleDeleteTeam = async (id: string) => {
    try {
      const res = await fetch(`/api/teams/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchTeams();
      } else {
        console.error('Error deleting team:', await res.json());
      }
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const openEditModal = (team: ITeamPlatform) => {
    setSelectedTeam(team);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Equipos</h1>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mb-4"
          onClick={() => setIsAddModalOpen(true)}
        >
          Añadir Equipo
        </button>
        <div>
          <h2 className="text-2xl font-bold mb-4">Listado de Equipos</h2>
          <ul>
            {teams.map((team) => (
              <li key={team._id} className="mb-2 p-2 border rounded bg-gray-50 cursor-pointer" onClick={() => openEditModal(team)}>
                <div className="flex justify-between items-center">
                  <div className="cursor-pointer">
                    <p><strong>Capitán:</strong> Amigos de {team.captain}</p>
                    <p><strong>Color:</strong> {team.color}</p>
                  </div>
                </div>
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

      {/* Modal para añadir equipo */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Añadir Equipo</h2>
        <form onSubmit={handleAddTeam}>
          <div className="mb-4">
            <label className="block text-gray-700">Capitán</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              value={newTeam.captain}
              onChange={(e) => setNewTeam({ ...newTeam, captain: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Color</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              value={newTeam.color}
              onChange={(e) => setNewTeam({ ...newTeam, color: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Jugadores (separados por comas)</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              value={newTeam.players}
              onChange={(e) => setNewTeam({ ...newTeam, players: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Añadir Equipo
          </button>
        </form>
      </Modal>

      {/* Modal para editar equipo */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Equipo</h2>
        {selectedTeam && (
          <form onSubmit={handleEditTeam}>
            <div className="mb-4">
              <label className="block text-gray-700">Capitán</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded"
                value={selectedTeam.captain}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, captain: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Color</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded"
                value={selectedTeam.color}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, color: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Jugadores (separados por comas)</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded"
                value={selectedTeam.players.join(', ')}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, players: e.target.value.split(',').map(player => player.trim()) })}
                required
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

export default Equipos;

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
