import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);

  (async () => {
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
    } catch (error) {
      console.log(error);
    }
  })();
} else {
  const provider = new Web3.providers.WebsocketProvider('ws://localhost:7545');

  web3 = new Web3(provider);
}

export default web3;
