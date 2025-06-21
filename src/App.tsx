import AddBookForm from "./components/AddBookForm";
import AvailableBooks from "./components/AvailableBooks";
import BorrowedBooksDisplay from "./components/BorrowedBooksDisplay";
import UserSelection from "./components/UserSelection";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 py-8 px-4 ">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-indigo-700 italic">Kütüphane Yönetim Sistemi</h1>
        </header>

        <main>
          <UserSelection />
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <AddBookForm />
            </section>


            <section className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <AvailableBooks />
            </section>


            <section className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <BorrowedBooksDisplay />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
