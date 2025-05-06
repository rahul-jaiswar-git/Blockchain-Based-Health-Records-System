# Healthcare Blockchain System

![GitHub repo size](https://img.shields.io/github/repo-size/rahul-jaiswar-git/Blockchain-Based-Health-Records-System?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/rahul-jaiswar-git/Blockchain-Based-Health-Records-System?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/rahul-jaiswar-git/Blockchain-Based-Health-Records-System?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/rahul-jaiswar-git/Blockchain-Based-Health-Records-System?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/rahul-jaiswar-git/Blockchain-Based-Health-Records-System?style=for-the-badge)

<img src="project-screenshot.png" alt="Healthcare Blockchain System Screenshot">

> A decentralized healthcare record management system built on Ethereum blockchain. This system allows doctors to securely manage patient records while ensuring data integrity and privacy. Patients can access their medical history through a user-friendly interface.

### Key Features

The project includes the following features:

- [x] Doctor Registration and Authentication
- [x] Patient Record Management
- [x] Secure Data Storage on Blockchain
- [x] Real-time Blockchain Explorer
- [x] Responsive Web Interface
- [ ] Patient Consent Management
- [ ] Multi-doctor Access Control
- [ ] Emergency Access Protocol

## 💻 Prerequisites

Before you begin, make sure you meet the following requirements:

- Node.js (v14 or higher)
- MetaMask browser extension
- Git
- A modern web browser (Chrome, Firefox, or Edge)
- Basic understanding of blockchain concepts

## 🚀 Installation

To install the Healthcare Blockchain System, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/rahul-jaiswar-git/Blockchain-Based-Health-Records-System.git
cd Blockchain-Based-Health-Records-System
```

2. Install dependencies:
```bash
npm install
cd frontend
npm install
```

3. Start the local blockchain:
```bash
npx hardhat node
```

4. Deploy the smart contract:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

5. Start the frontend application:
```bash
cd frontend
npm start
```

## ☕ Usage

### For Doctors
1. Connect your MetaMask wallet
2. Click "Login as Doctor"
3. Register as a doctor (first-time only)
4. Access the doctor dashboard to:
   - Add new patients
   - Update patient records
   - View patient history
   - Explore blockchain transactions

### For Patients
1. Connect your MetaMask wallet
2. Click "Login as Patient"
3. Access your medical records
4. View your treatment history
5. Check assigned doctors

### Blockchain Explorer
- View recent blocks
- Track transactions
- Monitor contract interactions
- Verify data integrity

## 🛠️ Technology Stack

- **Frontend**: React.js, React-Bootstrap
- **Smart Contract**: Solidity (v0.8.0)
- **Blockchain**: Ethereum (Hardhat Network)
- **Web3**: Ethers.js
- **Development**: Hardhat
- **Wallet Integration**: MetaMask

## 📫 Contributing

To contribute to this project, follow these steps:

1. Fork this repository
2. Create a branch: `git checkout -b feature/AmazingFeature`
3. Make your changes and commit them: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## 🔒 Security Features

- Role-based access control
- Immutable record storage
- Transparent transaction history
- Secure doctor authentication
- Patient data privacy

## 🏗️ Architecture

<!-- Architecture section to be updated later -->
```
project/
├── contracts/                 # Smart Contracts
│   └── HealthcareRecords.sol  # Main Healthcare Contract
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/       # React Components
│   │   ├── utils/           # Utility Functions
│   │   └── artifacts/       # Compiled Contract Files
├── scripts/                  # Deployment Scripts
└── hardhat.config.js        # Hardhat Configuration
```

## 🤝 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/rahul-jaiswar-git" title="Rahul Jaiswar">
        <img src="https://avatars.githubusercontent.com/rahul-jaiswar-git" width="100px;" alt="Rahul Jaiswar's GitHub photo"/><br>
        <sub>
          <b>Rahul Jaiswar</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 License

MIT License

Copyright (c) 2024 Rahul Jaiswar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## ⚠️ Important Notes

- This is a development version and should not be used in production without proper security audits
- Always use test networks for development
- Keep your private keys secure
- Regularly backup your data
