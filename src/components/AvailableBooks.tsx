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
    return <p>Ödünç alınacak kitap bulunmamaktadır.</p>;
  }

  return (
    <div>
      <header>
        <h1>Mevcut Kitaplar</h1>
      </header>
      <ul>
        {availableBooks.map((book: Book) => (
          <li key={book.id}>
            <div>
              <strong>{book.title}</strong> - <em>{book.author}</em>
            </div>
            <button
              onClick={() => borrowBook(book.id)}
              disabled={!activeUserId}
            >
              Ödünç Al
            </button>
          </li>
        ))}
        {!activeUserId && (
          <p className="warning">
            Kitap ödünç almak için lütfen bir kullanıcı seçin.
          </p>
        )}
      </ul>
    </div>
  );
};

export default AvailableBooks;
