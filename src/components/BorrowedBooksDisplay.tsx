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

  if (!borrowedBooks.length) {
    return <p>Şu anda ödünç alınmış kitap bulunmamaktadır.</p>;
  }

  const findUserName = (userId?: string) => {
    if (!userId) return "Bilinmiyor";
    return (
      users.find((user) => user.id === userId)?.name || "Bilinmeyen Kullanıcı"
    );
  };

  return (
    <div>
      <header>
        <h2>Ödünç Alınan Kitaplar</h2>
      </header>
      <ul>
        {borrowedBooks.map((book: Book) => (
          <li key={book.id}>
            <div>
              <strong>{book.title}</strong> - <em>{book.author}</em>
              <br />
              <small>
                Ödünç Alan: {findUserName(book.borrowByUserId)}
                {book.borrowDate &&
                  `(${new Date(book.borrowDate).toLocaleDateString()})`}
              </small>
            </div>
            <button
              onClick={() => returnBook(book.id)}
              disabled={!activeUserId || book.borrowByUserId !== activeUserId}
            >
              Geri Ver
            </button>
          </li>
        ))}
        {!activeUserId &&
          borrowedBooks.some((b) => b.borrowByUserId === activeUserId) && (
            <p>Kitap geri vermek için lütfen ilgili kullanıcıyı seçin.</p>
          )}
      </ul>
    </div>
  );
};

export default BorrowedBooksDisplay;
