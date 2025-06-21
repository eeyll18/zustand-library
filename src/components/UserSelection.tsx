import React, { useState } from "react";
import useLibraryStore from "../store/libraryStore";

const UserSelection: React.FC = () => {
  const users = useLibraryStore((state) => state.users);
  const activeUserId = useLibraryStore((state) => state.activeUserId);
  const setActiveUser = useLibraryStore((state) => state.setActiveUser);
  const addUser = useLibraryStore((state) => state.addUser);

  const [newUserName, setNewUserName] = useState("");

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser({ name: newUserName.trim() });
      setNewUserName("");
    }
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 transition-all hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Aktif Kullanıcı Seçimi</h3>
      <div className="grid sm:grid-cols-2 gap-4 items-end">
        <div>
          <label htmlFor="user-select" className="block text-sm font-medium text-slate-600 mb-1">
            Kullanıcı Seç:
          </label>
          <select
            id="user-select"
            value={activeUserId || ''}
            onChange={(e) => setActiveUser(e.target.value || undefined)}
            className="w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">-- Kullanıcı Seçin --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="add-user-form">
          <label htmlFor="new-user-name" className="block text-sm font-medium text-slate-600 mb-1">
            Yeni Kullanıcı Ekle:
          </label>
          <div className="flex space-x-2">
            <input
              id="new-user-name"
              type="text"
              placeholder="Kullanıcı Adı"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="flex-grow p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            <button
              onClick={handleAddUser}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-150 ease-in-out"
            >
              Ekle
            </button>
          </div>
        </div>
      </div>
      {activeUserId && (
        <p className="mt-5 p-3 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
          Aktif Kullanıcı: <strong>{users.find(u => u.id === activeUserId)?.name}</strong>
        </p>
      )}
    </div>
  );
};

export default UserSelection;
