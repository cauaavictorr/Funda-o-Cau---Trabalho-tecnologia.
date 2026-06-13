import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Inicio from "./pages/Inicio";
import Cursos from "./pages/Cursos";
import Matriculas from "./pages/Matriculas";
import Pagamentos from "./pages/Pagamentos";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/matriculas" element={<Matriculas />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
      </Routes>
    </BrowserRouter>
  );
}
