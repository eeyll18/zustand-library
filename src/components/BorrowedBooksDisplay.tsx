import React from "react";
import useLibraryStore from "../store/libraryStore";
import type { Book } from "../types/Book";

const BorrowedBooksDisplay: React.FC = () => {
  const books = useLibraryStore((state) => state.books);
  const borrowedBooks = React.useMemo(
    () => books.filter((book) => book.isBorrowed),
    [books]
  );
  const returnBook = useLibraryStore((state) => state.returnBook);
  const users = useLibraryStore((state) => state.users);
  const activeUserId = useLibraryStore((state) => state.activeUserId);

  const findUserName = (userId?: string) => {
    if (!userId) return "Bilinmiyor";
    return (
      users.find((user) => user.id === userId)?.name || "Bilinmeyen Kullanıcı"
    );
  };

  if (!borrowedBooks.length) {
    return (
      <p className="text-slate-500 italic text-center py-4">
        Şu anda ödünç alınmış kitap bulunmamaktadır.
      </p>
    );
  }

  return (
    <div>
      <header>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 border-b pb-3 border-slate-200">
          Ödünç Alınan Kitaplar
        </h2>
      </header>
      <div className="space-y-2">
        {borrowedBooks.map((book: Book) => (
          <div
            key={book.id}
            className="bg-slate-50 p-4 rounded-lg shadow hover:shadow-md transition-all duration-200 flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold text-slate-700">{book.title}</h4>
              <p className="text-sm text-slate-500 ">{book.author}</p>
              <br />
              <p className="text-xs text-indigo-500 mt-1">
                Ödünç Alan: <strong>{findUserName(book.borrowByUserId)}</strong>
                {book.borrowDate &&
                  ` (${new Date(book.borrowDate).toLocaleDateString()})`}
              </p>
            </div>
            <button
              onClick={() => returnBook(book.id)}
              disabled={!activeUserId || book.borrowByUserId !== activeUserId}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-md shadow hover:shadow-md transform hover:scale-105 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Geri Ver
            </button>
          </div>
        ))}
        {!activeUserId &&
          borrowedBooks.some((b) => b.borrowByUserId === activeUserId) && (
            <p> Kitap geri vermek için lütfen ilgili kullanıcıyı seçin.</p>
          )}
      </div>
    </div>
  );
};

export default BorrowedBooksDisplay;
