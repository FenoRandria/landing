import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Accueil from './page/accueil/Accueil';
import Header from './composant/composant_header/Header';
import Historique from './page/historique/Historique';
import Result_search from './page/resulat_recherche/Result_search';
import Login from './page/auth/Login';
import Register from './page/auth/Register';
import Message from './page/message/Message';


const App = ({url,nompage}) => {
  return (
    <>
      <Router>
          <Routes>
              <Route path="/page/login" element={<Login />}/>
          </Routes>
          <Routes>
              <Route path="/page/register" element={<Register />}/>
          </Routes>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="" element={<Accueil />} />
            <Route path="/accueil" element={<Navigate to="/" />}/>
            <Route path="/historique" element={<Historique />} />
            <Route  path="/recherche" element={<Result_search />} />
            <Route path="/message" element={< Message/>} />
            <Route path="/list" element={< Historique/>} />
          </Routes>
        </main>
      </Router>
      {/* <Footer /> */}
    </>
  );
};

export default App;
