import { ethers } from 'ethers';
import HealthcareRecordsArtifact from '../artifacts/contracts/HealthcareRecords.sol/HealthcareRecords.json';

// Update with your deployed contract address
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

console.log("Using hardcoded contract address:", contractAddress);

export const connectWallet = async () => {
  if (!window.ethereum) {
    alert('Please install MetaMask to use this application');
    return null;
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    // Create a provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Get the signer
    const signer = provider.getSigner();
    
    // Create a contract instance
    const contract = new ethers.Contract(
      contractAddress,
      HealthcareRecordsArtifact.abi,
      signer
    );

    // Register as doctor if not already registered
    try {
      const isDoctor = await contract.isDoctor(accounts[0]);
      if (!isDoctor) {
        const tx = await contract.registerDoctor(accounts[0]);
        await tx.wait();
      }
    } catch (error) {
      console.error('Error registering doctor:', error);
    }
    
    return { 
      address: accounts[0], 
      provider, 
      signer, 
      contract 
    };
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw error;
  }
};

export const checkIfDoctor = async (contract, address) => {
  try {
    return await contract.isDoctor(address);
  } catch (error) {
    console.error('Error checking if doctor:', error);
    return false;
  }
};

export const addPatient = async (contract, patientId, name, age, disease) => {
  try {
    const tx = await contract.addPatient(patientId, name, age, disease);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const updatePatient = async (contract, patientId, disease) => {
  try {
    const tx = await contract.updatePatient(patientId, disease);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const getPatient = async (contract, patientId) => {
  try {
    const patient = await contract.getPatient(patientId);
    return {
      name: patient.name,
      age: patient.age.toString(),
      disease: patient.disease,
      doctorAssigned: patient.doctorAssigned
    };
  } catch (error) {
    console.error('Error getting patient:', error);
    throw error;
  }
};

export const authorizeDoctor = async (contract, patientId, doctorAddress) => {
  try {
    const tx = await contract.authorizeDoctor(patientId, doctorAddress);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error('Error authorizing doctor:', error);
    throw error;
  }
};