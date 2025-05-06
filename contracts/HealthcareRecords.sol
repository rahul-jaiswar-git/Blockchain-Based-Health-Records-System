// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthcareRecords {
    struct Patient {
        string name;
        uint age;
        string disease;
        address doctorAssigned;
    }
    
    mapping(string => Patient) private patients;
    mapping(address => bool) public doctors;
    
    // Register a doctor
    function registerDoctor(address _doctor) public {
        doctors[_doctor] = true;
    }
    
    // Check if an address is a doctor
    function isDoctor(address _address) public view returns (bool) {
        return doctors[_address];
    }
    
    // Add a new patient
    function addPatient(string memory _patientId, string memory _name, uint _age, string memory _disease) public {
        patients[_patientId] = Patient(_name, _age, _disease, msg.sender);
    }
    
    // Update patient information
    function updatePatient(string memory _patientId, string memory _disease) public {
        Patient storage patient = patients[_patientId];
        patient.disease = _disease;
    }
    
    // Get patient information
    function getPatient(string memory _patientId) public pure returns (Patient memory) {
        return patients[_patientId];
    }
}