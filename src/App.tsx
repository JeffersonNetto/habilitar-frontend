import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { Rotas } from "./routes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Rotas />
      </Router>
    </AuthProvider>
  );
}

export default App;
