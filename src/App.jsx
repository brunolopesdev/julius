import "./App.scss";
import { AuthProvider } from "./context/AuthContext";
import { Rotas } from "./routes/Index";

function App() {
  return (
    <AuthProvider>
      <section className="dash__container">
        <Rotas />
      </section>
    </AuthProvider>
  );
}

export default App;
