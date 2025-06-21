import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Book } from "../types/Book";
import type { User } from "../types/User";

interface LibraryState {
  books: Book[];
  users: User[];
  activeUserId: string | undefined;

  // actions
  addBook: (newBookData: Omit<Book, "id" | "isBorrowed">) => void;
  addUser: (newUserData: Omit<User, "id">) => void;
  setActiveUser: (userId: string | undefined) => void;
  borrowBook: (bookId: string) => void;
  returnBook: (bookId: string) => void;
  getAvailableBooks: () => Book[];
  getBorrowedBooks: (userId?: string) => Book[];
}

const generateId = () => Math.random().toString(36).substring(2, 11);

const useLibraryStore = create<LibraryState>()(
  devtools(
    persist(
      (set, get) => ({
        // initial state ---
        books: [
          {
            id: generateId(),
            title: "Yüzyıllık Yalnızlık",
            author: "Gabriel Garcia Marquez",
            isBorrowed: false,
          },
          {
            id: generateId(),
            title: "Suç ve Ceza",
            author: "Fyodor Dostoyevski",
            isBorrowed: false,
          },
          {
            id: generateId(),
            title: "Dönüşüm",
            author: "Franz Kafka",
            isBorrowed: false,
          },
        ],
        users: [
          { id: "user_1", name: "Ali Veli" },
          { id: "user_2", name: "Ayşe Yılmaz" },
        ],
        activeUserId: undefined,

        // actions
        addBook: (newBookData) =>
          set((state) => ({
            books: [
              ...state.books,
              {
                ...newBookData,
                id: generateId(),
                isBorrowed: false,
              },
            ],
          })),
        addUser: (newUserData) =>
          set((state) => ({
            users: [
              ...state.users,
              {
                ...newUserData,
                id: generateId(),
              },
            ],
          })),
        setActiveUser: (userId) => set({ activeUserId: userId }),
        borrowBook: (bookId) =>
          set((state) => {
            if (!state.activeUserId) {
              console.warn(
                "Kitap ödünç almak için aktif bir kullanıcı seçilmelidir."
              );
              return {}; // State'i değiştirme
            }
            const bookToBorrow = state.books.find((book) => book.id === bookId);
            if (bookToBorrow && !bookToBorrow.isBorrowed) {
              return {
                books: state.books.map((book) =>
                  book.id === bookId
                    ? {
                        ...book,
                        isBorrowed: true,
                        borrowByUserId: state.activeUserId,
                        borrowDate: new Date().toISOString(),
                      }
                    : book
                ),
              };
            }
            console.warn(
              `Kitap (ID: ${bookId}) bulunamadı veya zaten ödünç alınmış.`
            );
            return {};
          }),
        returnBook: (bookId) =>
          set((state) => {
            const bookToReturn = state.books.find((book) => book.id === bookId);
            if (bookToReturn && bookToReturn.isBorrowed) {
              return {
                books: state.books.map((book) =>
                  book.id === bookId
                    ? {
                        ...book,
                        isBorrowed: false,
                        borrowByUserId: undefined,
                        borrowDate: undefined,
                      }
                    : book
                ),
              };
            }
            console.warn(
              `Kitap (ID: ${bookId}) bulunamadı veya zaten iade edilmiş.`
            );
            return {};
          }),

        // helper getters
        getAvailableBooks: () => get().books.filter((book) => !book.isBorrowed),
        getBorrowedBooks: (userId?: string) => {
          const borrowed = get().books.filter((book) => book.isBorrowed);
          if (userId) {
            return borrowed.filter((book) => book.borrowByUserId === userId);
          }
          return borrowed;
        },
      }),
      { name: "library-app-storage" } // localstorage key ismi
    ),
    { name: "LibraryAppStore" } // devtools için
  )
);

export default useLibraryStore;
