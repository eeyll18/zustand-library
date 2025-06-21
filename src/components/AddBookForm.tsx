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
      console.log("eklendi");
    } else {
      alert("Başlık ve yazar boş bırakılamaz.");
    }
  };

  return (
    <div>
      <header>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 border-b pb-3 border-slate-200">
          Yeni Kitap Ekle
        </h2>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-600 mb-1"
          >
            Başlık:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Yüzyıllık Yalnızlık"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 shadow-sm border border-slate-300 rounded-lg transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-slate-600 mb-1"
          >
            Yazar:
          </label>
          <input
            type="text"
            id="author"
            value={author}
            placeholder="Gabriel Garcia Marquez"
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 shadow-sm border border-slate-300 rounded-lg  transition-colors "
          />
        </div>
        <button
          className="w-full p-2  bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-150 ease-in-out disabled:opacity-50"
          type="submit"
        >
          Kitap Ekle
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
