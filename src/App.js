import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomerContainer from './containers/CustomerContainer';
import NewCustomerContainer from './containers/NewCustomerContainer';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/customers" element={<CustomerContainer />} />
          <Route path="/customers/new" element={<NewCustomerContainer />} />
          <Route path="/customers/:dni" element={<CustomerContainer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

