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
    <div>
      <h1>Aktif Kullanıcı Seçimi</h1>
      <select
        value={activeUserId || ""}
        onChange={(e) => setActiveUser(e.target.value || undefined)}
      >
        <option value=""> -- Kullanıcı Seçin -- </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <div className="add-user-form">
        <input
          type="text"
          placeholder="Yeni Kullanıcı Adı"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={handleAddUser}>Kullanıcı Ekle</button>
      </div>
      {activeUserId && (
        <p>
          Aktif Kullanıc:{" "}
          <strong>
            {users.find((user) => user.id === activeUserId)?.name}
          </strong>
        </p>
      )}
    </div>
  );
};

export default UserSelection;
