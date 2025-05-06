import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginScreen from './components/LoginScreen';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import BlockchainExplorer from './components/BlockchainExplorer';
import { Button, Container, Nav, Tab } from 'react-bootstrap';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {!user ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <>
          <Container fluid className="p-0">
            <Nav variant="tabs" className="bg-light p-2" activeKey={activeTab} onSelect={setActiveTab}>
              <Nav.Item>
                <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="explorer">Blockchain Explorer</Nav.Link>
              </Nav.Item>
              <Nav.Item className="ms-auto">
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Item>
            </Nav>
            
            {activeTab === 'dashboard' ? (
              user.isDoctor ? (
                <DoctorDashboard user={user} onLogout={handleLogout} />
              ) : (
                <PatientDashboard user={user} onLogout={handleLogout} />
              )
            ) : (
              <BlockchainExplorer 
                provider={user.provider} 
                contractAddress={user.contract.address} 
              />
            )}
          </Container>
        </>
      )}
    </div>
  );
}

export default App;