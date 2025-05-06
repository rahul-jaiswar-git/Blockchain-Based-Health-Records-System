import React, { useState } from 'react';
import { Container, Navbar, Nav, Button, Card, Form, Alert, Table } from 'react-bootstrap';

const DoctorDashboard = ({ user, onLogout }) => {
  const [patientForm, setPatientForm] = useState({
    patientId: '',
    name: '',
    age: '',
    disease: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [patients, setPatients] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleChange = (e) => {
    setPatientForm({
      ...patientForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const tx = await user.contract.addPatient(
        patientForm.patientId,
        patientForm.name,
        patientForm.age,
        patientForm.disease
      );
      await tx.wait();
      
      setSuccess(`Patient ${patientForm.name} added successfully!`);
      setPatients([...patients, patientForm]);
      setPatientForm({
        patientId: '',
        name: '',
        age: '',
        disease: ''
      });
    } catch (err) {
      console.error('Error adding patient:', err);
      setError('Failed to add patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchId) return;
    
    setLoading(true);
    setError('');
    
    try {
      const patient = await user.contract.getPatient(searchId);
      setSearchResult({
        name: patient.name,
        age: patient.age.toString(),
        disease: patient.disease
      });
    } catch (err) {
      console.error('Error searching patient:', err);
      setError('Failed to find patient. Please check the ID.');
      setSearchResult(null);
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
            <Nav.Link href="#patients">Patients</Nav.Link>
          </Nav>
          <Navbar.Text className="me-3">
            Doctor: {user.address.substring(0, 6)}...{user.address.substring(user.address.length - 4)}
          </Navbar.Text>
          <Button variant="outline-light" onClick={onLogout}>Logout</Button>
        </Container>
      </Navbar>
      
      <Container className="mt-4">
        <h2>Doctor Dashboard</h2>
        
        <Card className="mb-4">
          <Card.Header>Add New Patient</Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form onSubmit={handleAddPatient}>
              <Form.Group className="mb-3">
                <Form.Label>Patient ID</Form.Label>
                <Form.Control
                  type="text"
                  name="patientId"
                  value={patientForm.patientId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={patientForm.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={patientForm.age}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Disease/Condition</Form.Label>
                <Form.Control
                  type="text"
                  name="disease"
                  value={patientForm.disease}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Patient'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        
        <Card className="mb-4">
          <Card.Header>Search Patient</Card.Header>
          <Card.Body>
            <div className="d-flex mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Patient ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="me-2"
              />
              <Button variant="primary" onClick={handleSearch} disabled={loading}>
                Search
              </Button>
            </div>
            
            {searchResult && (
              <div className="mt-3">
                <h5>Patient Information</h5>
                <p><strong>Name:</strong> {searchResult.name}</p>
                <p><strong>Age:</strong> {searchResult.age}</p>
                <p><strong>Disease/Condition:</strong> {searchResult.disease}</p>
              </div>
            )}
          </Card.Body>
        </Card>
        
        {patients.length > 0 && (
          <Card>
            <Card.Header>Recently Added Patients</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Disease</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index}>
                      <td>{patient.patientId}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.disease}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default DoctorDashboard;