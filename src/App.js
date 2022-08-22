import Provincias from "./components/Provincias";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App max-w-screen-xl m-auto min-h-screen flex flex-col">
      <Header />
      <Provincias />
      <Footer />
    </div>
  );
}

export default App;
