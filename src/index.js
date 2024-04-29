import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './index.css';

// Importando Componentes para criar roteador
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client'

// Importando Páginas localizadas na pasta ./pages
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import ListaContatos from './pages/lista_contatos/listaContatos';
import Redefinir from './pages/redefinir/redefinir';
import NovaSenha from './pages/nova_senha/nova_senha';
import Verificacao from './pages/verificacao/verificacao';

// Importando página de Erro
import ErrorPage from './pages/pagina_erro/pagina_erro';

// Criando variável de rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cadastro",
    element: <Cadastro/>,
  },
  {
    path: "/listacontatos",
    element: <ListaContatos/>,
  },
  {
    path: "/redefinir",
    element: <Redefinir/>,
  },
  {
    path: "/novasenha",
    element: <NovaSenha/>,
  },
  {
    path: "/verificacao",
    element: <Verificacao/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  {/* Iniciando o roteador com as configurações da rota */}
  <RouterProvider router={router} />
</React.StrictMode>
);
