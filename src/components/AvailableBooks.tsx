import React from "react";
import useLibraryStore from "../store/libraryStore";
import type { Book } from "../types/Book";

const AvailableBooks: React.FC = () => {
  const books = useLibraryStore((state) => state.books);
  const availableBooks = React.useMemo(
    () => books.filter((book) => !book.isBorrowed),
    [books]
  );
  const borrowBook = useLibraryStore((state) => state.borrowBook);
  const activeUserId = useLibraryStore((state) => state.activeUserId);

  if (!availableBooks.length) {
    return (
      <p className="text-slate-500 italic text-center py-4">
        Ödünç alınabilecek kitap bulunmamaktadır.
      </p>
    );
  }

  return (
    <div>
      <header>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 border-b pb-3 border-slate-200">
          Mevcut Kitaplar
        </h2>
      </header>
      <div className="space-y-3">
        {availableBooks.map((book: Book) => (
          <div
            className="bg-slate-50 p-4 rounded-lg shadow hover:shadow-md transition-all duration-200 flex justify-between items-center"
            key={book.id}
          >
            <div>
              <h4 className="font-semibold text-slate-700">{book.title}</h4>
              <p className="text-sm text-slate-500 ">{book.author}</p>{" "}
            </div>
            <button
              onClick={() => borrowBook(book.id)}
              disabled={!activeUserId}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2 px-3 rounded-md shadow hover:shadow-md transform hover:scale-105 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Ödünç Al
            </button>
          </div>
        ))}
        {!activeUserId && (
          <p className="mt-4 p-3 text-sm bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg">
            Kitap ödünç almak için lütfen bir kullanıcı seçin.
          </p>
        )}
      </div>
    </div>
  );
};

export default AvailableBooks;
