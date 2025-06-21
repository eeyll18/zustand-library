import React, { useState } from "react";
import useLibraryStore from "../store/libraryStore";

const AddBookForm: React.FC = () => {
  const addBook = useLibraryStore((state) => state.addBook);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      addBook({ title, author });
      setTitle("");
      setAuthor("");
      console.log("eklendi")
    } else {
      alert("Başlık ve yazar boş bırakılamaz.");
    }
  };

  return (
    <div>
      <header>
        <h1>Yeni Kitap Ekle</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Başlık: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Yazar: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Kitap Ekle</button>
      </form>
    </div>
  );
};

export default AddBookForm;
