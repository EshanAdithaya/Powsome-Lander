import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetDocLanding from './Pages/PetDocLanding';


const App = () => {
  return (
    <Router>
      
<Routes >
<Route path="/handler" element={<PetDocLanding />} />
</Routes>
      
    </Router>
  );
};

export default App;