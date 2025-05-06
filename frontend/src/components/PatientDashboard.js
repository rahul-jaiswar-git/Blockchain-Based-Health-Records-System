import React, { useState } from 'react';
import { Container, Navbar, Nav, Button, Card, Form, Alert } from 'react-bootstrap';

const PatientDashboard = ({ user, onLogout }) => {
  const [patientId, setPatientId] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleViewRecords = async (e) => {
    e.preventDefault();
    if (!patientId) return;
    
    setLoading(true);
    setError('');
    
    try {
      const patient = await user.contract.getPatient(patientId);
      
      if (patient.name === '') {
        setError('No records found for this ID');
        setPatientData(null);
      } else {
        setPatientData({
          name: patient.name,
          age: patient.age.toString(),
          disease: patient.disease,
          doctorAddress: patient.doctorAssigned
        });
      }
    } catch (err) {
      console.error('Error fetching patient data:', err);
      setError('Failed to fetch records. Please check the ID.');
      setPatientData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Healthcare Records</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#records">My Records</Nav.Link>
          </Nav>
          <Navbar.Text className="me-3">
            Patient: {user.address.substring(0, 6)}...{user.address.substring(user.address.length - 4)}
          </Navbar.Text>
          <Button variant="outline-light" onClick={onLogout}>Logout</Button>
        </Container>
      </Navbar>
      
      <Container className="mt-4">
        <h2>Patient Dashboard</h2>
        
        <Card className="mb-4">
          <Card.Header>View Your Medical Records</Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleViewRecords}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Your Patient ID</Form.Label>
                <Form.Control
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                />
                <Form.Text className="text-muted">
                  Enter the ID provided by your doctor
                </Form.Text>
              </Form.Group>
              
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'View Records'}
              </Button>
            </Form>
            
            {patientData && (
              <div className="mt-4">
                <h4>Your Medical Information</h4>
                <p><strong>Name:</strong> {patientData.name}</p>
                <p><strong>Age:</strong> {patientData.age}</p>
                <p><strong>Disease/Condition:</strong> {patientData.disease}</p>
                <p><strong>Doctor:</strong> {patientData.doctorAddress.substring(0, 6)}...{patientData.doctorAddress.substring(patientData.doctorAddress.length - 4)}</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default PatientDashboard;