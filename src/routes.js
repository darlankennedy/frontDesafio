import React from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Logon from './pages/logon';
// import Register from './pages/Register';
// import NewIncident from './pages/NewIncident';

import Produtos from "./pages/ProdutosLIsta";
import Compras from "./pages/Compras";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Produtos />} path='/' />
      <Route index element={<Compras />} path='/compras'/>
    </Routes>
  </BrowserRouter>
);
