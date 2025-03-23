import { BrowserProvider, Contract } from 'ethers';
import FriendBucks from '../../Blockchain/src/contracts/FriendBucks.sol/FriendBucks.json';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const provider = new BrowserProvider(window.ethereum!);
const signer = await provider.getSigner();
const friendBucksAddress = '0xD82190C45FdA27ED34AC2451b4C2eec3A38f0f4c';
const friendBucksContract = new Contract(friendBucksAddress, FriendBucks.abi, signer);

export { provider, signer, friendBucksContract };
