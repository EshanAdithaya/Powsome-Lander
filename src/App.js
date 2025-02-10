import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Index';


const App = () => {
  return (
    <Router>
      <Layout>
<Routes >
<Route path="/handler" element={<Index />} />
</Routes>
      </Layout>
    </Router>
  );
};

export default App;