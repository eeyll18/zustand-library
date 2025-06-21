import AddBookForm from "./components/AddBookForm";
import AvailableBooks from "./components/AvailableBooks";
import BorrowedBooksDisplay from "./components/BorrowedBooksDisplay";
import UserSelection from "./components/UserSelection";

function App() {
  return (
    <div className="container">
      <header className="text-red-500">
        <h1>Kütüphane Yönetim Sistemi</h1>
      </header>

      <main>
        <UserSelection />
        <hr />
        <div className="content-columns">
          <section className="column">
            <AddBookForm />
          </section>

          <hr />

          <section className="column">
            <AvailableBooks />
          </section>

          <hr />

          <section className="column">
            <BorrowedBooksDisplay />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
