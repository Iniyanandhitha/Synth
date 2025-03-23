import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    const FriendBucks = await ethers.getContractFactory("FriendBucks");
    const fb = await FriendBucks.deploy();
    await fb.waitForDeployment(); // Fix here
    console.log("FriendBucks deployed at:", await fb.getAddress()); // Fix here

    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy(await fb.getAddress()); // Fix here
    await market.waitForDeployment(); // Fix here
    console.log("Market deployed at:", await market.getAddress()); // Fix here
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
