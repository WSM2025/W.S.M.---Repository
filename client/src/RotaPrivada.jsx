// client/src/RotaPrivada.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * RotaPrivada - componente wrapper para proteger rotas por nível.
 * usuario esperado no localStorage: { codigo, nome, nivel }
 *
 * Regras:
 * - se não logado -> redireciona para '/'
 * - se usuario.nivel > nivelNecessario -> redireciona para '/sem-acesso'
 *   (ex: nivelNecessario=1 = admin, 2 = comum; menor número = mais privilégio)
 */
function RotaPrivada({ children, nivelNecessario }) {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
      return <Navigate to="/" replace />;
    }

    // Converter para number por segurança
    const nivelUsuario = Number(usuario.nivel ?? 99);

    // Se nível do usuário for maior (menos privilégio) que o necessário, negar
    if (nivelUsuario > Number(nivelNecessario)) {
      return <Navigate to="/sem-acesso" replace />;
    }

    return children;
  } catch (err) {
    // qualquer erro -> redireciona para login
    return <Navigate to="/" replace />;
  }
}

export default RotaPrivada;
