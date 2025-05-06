import React, { useState } from 'react';
import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';
import { connectWallet, checkIfDoctor } from '../utils/blockchain';

const LoginScreen = ({ onLogin }) => {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

  const handleConnect = async (role) => {
    setConnecting(true);
    setError('');
    setSelectedRole(role);
    
    try {
      const walletData = await connectWallet();
      
      if (!walletData) {
        setError('Failed to connect wallet. Please try again.');
        setConnecting(false);
        return;
      }
      
      // If doctor role selected, verify if they're registered
      let isDoctor = false;
      if (role === 'doctor') {
        try {
          isDoctor = await checkIfDoctor(walletData.contract, walletData.address);
          
          if (!isDoctor) {
            // For demo purposes, register as doctor if not already
            const tx = await walletData.contract.registerDoctor(walletData.address);
            await tx.wait();
            isDoctor = true;
          }
        } catch (err) {
          console.warn("Error checking doctor status:", err);
          // For demo, assume they are a doctor if they selected that role
          isDoctor = true;
        }
      }
      
      onLogin({
        ...walletData,
        isDoctor: role === 'doctor'
      });
    } catch (err) {
      console.error('Login error:', err);
      setError(`Failed to connect: ${err.message}`);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Healthcare Blockchain System</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="justify-content-center mt-5">
        <Col md={5}>
          <Card className="mb-4">
            <Card.Body className="text-center p-5">
              <h3>Doctor</h3>
              <p>Access patient records, add new patients, update medical information</p>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => handleConnect('doctor')}
                disabled={connecting}
              >
                {connecting && selectedRole === 'doctor' ? 'Connecting...' : 'Login as Doctor'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={5}>
          <Card className="mb-4">
            <Card.Body className="text-center p-5">
              <h3>Patient</h3>
              <p>View your medical records and history</p>
              <Button 
                variant="success" 
                size="lg" 
                onClick={() => handleConnect('patient')}
                disabled={connecting}
              >
                {connecting && selectedRole === 'patient' ? 'Connecting...' : 'Login as Patient'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;