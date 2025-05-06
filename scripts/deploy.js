const hre = require("hardhat");

async function main() {
  const HealthcareRecords = await hre.ethers.getContractFactory("HealthcareRecords");
  const healthcareRecords = await HealthcareRecords.deploy();

  await healthcareRecords.deployed();

  console.log("HealthcareRecords deployed to:", healthcareRecords.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });