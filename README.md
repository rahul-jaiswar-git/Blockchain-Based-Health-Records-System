# Healthcare Blockchain System

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/healthcare-blockchain?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/yourusername/healthcare-blockchain?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/yourusername/healthcare-blockchain?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/yourusername/healthcare-blockchain?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/healthcare-blockchain?style=for-the-badge)

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
git clone https://github.com/yourusername/healthcare-blockchain.git
cd healthcare-blockchain
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

## 🤝 Contributors

We thank the following people who contributed to this project:

<table>
  <tr>
    <td align="center">
      <a href="#" title="define the link title">
        <img src="https://avatars3.githubusercontent.com/u/31936044" width="100px;" alt="Iuri Silva's GitHub photo"/><br>
        <sub>
          <b>Iuri Silva</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="define the link title">
        <img src="https://s2.glbimg.com/FUcw2usZfSTL6yCCGj3L3v3SpJ8=/smart/e.glbimg.com/og/ed/f/original/2019/04/25/zuckerberg_podcast.jpg" width="100px;" alt="Mark Zuckerberg's photo"/><br>
        <sub>
          <b>Mark Zuckerberg</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="define the link title">
        <img src="https://miro.medium.com/max/360/0*1SkS3mSorArvY9kS.jpg" width="100px;" alt="Steve Jobs' photo"/><br>
        <sub>
          <b>Steve Jobs</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 😄 Be one of the contributors

Want to be part of this project? Click [HERE](CONTRIBUTING.md) and read how to contribute.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## ⚠️ Important Notes

- This is a development version and should not be used in production without proper security audits
- Always use test networks for development
- Keep your private keys secure
- Regularly backup your data
