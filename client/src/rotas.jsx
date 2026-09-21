// client/src/rotas.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// login pages
import Home from "./App"; // login funcionário
import LoginProduto from "./LoginProduto";
import SemAcesso from "./SemAcesso";

// produtos
import PCreate from "./P_create";
import PList from "./P_list";
import PRead from "./P_read";
import PUpdate from "./P_update";
import PDelete from "./P_delete";
import PBaixa from "./P_baixa";

// funcionarios
import FCreate from "./F_create";
import FClient from "./F_client";
import FSupplier from "./F_supplier";
import FRead from "./F_read";
import FUpdate from "./F_update";
import FDelete from "./F_delete";
import FList from "./F_list";

// dashboard
import Dashboard from "./dashboard"; 

// proteção de rotas
import RotaPrivada from "./RotaPrivada";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-produto" element={<LoginProduto />} />
        <Route path="/sem-acesso" element={<SemAcesso />} />

        {/* Dashboard protegido */}
        <Route
          path="/dashboard"
          element={
            <RotaPrivada nivelNecessario={2}>
              <Dashboard />
            </RotaPrivada>
          }
        />

        {/* CRUD Funcionário - somente nivel 1 */}
        <Route
          path="/F_create"
          element={
            <RotaPrivada nivelNecessario={1}>
              <FCreate />
            </RotaPrivada>
          }
        />
        <Route
          path="/F_client"
          element={
            <RotaPrivada nivelNecessario={1}>
              <FClient />
            </RotaPrivada>
          }
        />
        <Route
          path="/F_supplier" // ← ROTA ADICIONADA AQUI
          element={
            <RotaPrivada nivelNecessario={1}>
              <FSupplier />
            </RotaPrivada>
          }
        />
        <Route
          path="/F_read"
          element={
            <RotaPrivada nivelNecessario={1}>
              <FRead />
            </RotaPrivada>
          }
        />
        <Route
          path="/F_update"
          element={
            <RotaPrivada nivelNecessario={1}>
              <FUpdate />
            </RotaPrivada>
          }
        />
        <Route
          path="/F_delete"
          element={
            <RotaPrivada nivelNecessario={1}>
              <FDelete />
            </RotaPrivada>
          }
        />
        <Route
          path="/F_list"
          element={
            <RotaPrivada nivelNecessario={1}>
              <FList />
            </RotaPrivada>
          }
        />

        {/* CRUD Produto - nivel 1 ou 2 */}
        <Route
          path="/P_create"
          element={
            <RotaPrivada nivelNecessario={2}>
              <PCreate />
            </RotaPrivada>
          }
        />
        <Route
          path="/P_list"
          element={
            <RotaPrivada nivelNecessario={2}>
              <PList />
            </RotaPrivada>
          }
        />
        <Route
          path="/P_read"
          element={
            <RotaPrivada nivelNecessario={2}>
              <PRead />
            </RotaPrivada>
          }
        />
        <Route
          path="/P_update"
          element={
            <RotaPrivada nivelNecessario={2}>
              <PUpdate />
            </RotaPrivada>
          }
        />
        <Route
          path="/P_delete"
          element={
            <RotaPrivada nivelNecessario={2}>
              <PDelete />
            </RotaPrivada>
          }
        />
        <Route
          path="/P_baixa"
          element={
            <RotaPrivada nivelNecessario={2}>
              <PBaixa />
            </RotaPrivada>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;