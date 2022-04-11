import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Add } from "../components/Forms/Add/Index";
import { Sidebar } from "../components/Sidebar/Index";
import { Main } from "../pages/Dashboard/Index";
import { List } from "../pages/List/Index";
import { Edit } from "../components/Forms/Edit/Index";
import { SignUp } from "../pages/SignUp/Index";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { useAuth } from "../context/AuthContext";

export const Rotas = () => {
  const { currentUser } = useAuth();
  return (
    <Router>
      {currentUser && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="adicionar"
          element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          }
        />
        <Route
          path="listar"
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }
        />
        <Route
          path="listar/editar/:id"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
