import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs, Container, Row, Col, Navbar } from 'react-bootstrap';
import Web3 from 'web3';
import DBank from '../../ethereum/build/contracts/dBank.json';
import Token from '../../ethereum/build/contracts/Token.json';

const HomePage = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0.01);

  async function loadWeb3() {
    window.web3 = new Web3(window.ethereum);
    const { web3 } = window;

    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
    } catch (error) {
      console.log(error);
    }
    const accounts = await web3.eth.getAccounts();

    if (typeof accounts[0] !== 'undefined') {
      setAccount(accounts[0]);
    } else {
      window.alert('Please login with metamask');
    }
  }

  useEffect(() => {
    loadWeb3();
  }, []);

  const handleDeposit = async (event) => {
    event.preventDefault();
    const { web3 } = window;
    const dBank = new web3.eth.Contract(DBank.abi, DBank.networks[5777].address);
    let amount = balance;
    amount *= 10 ** 18;
    await dBank.methods.deposit().send({ from: account, value: amount.toString() });
  };

  const handleWithdraw = async (event) => {
    event.preventDefault();
    const { web3 } = window;
    const dBank = new web3.eth.Contract(DBank.abi, DBank.networks[5777].address);
    await dBank.methods.withdraw().send({ from: account });
  };

  return (
    <Container>
      <Navbar bg="dark" variant="dark" className="rounded-bottom">
        <Navbar.Brand href="#home">dBank</Navbar.Brand>
      </Navbar>
      <Row>
        <Col>
          <h1 className="text-center">Welcome to our Banking:</h1>
          <h2 className="text-center">{account}</h2>
        </Col>
      </Row>

      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="deposit" title="Deposit">
          <br />
          How much do you want to deposit?
          <br />
          (min. amount is 0.01 ETH)
          <br />
          (1 deposit is possible at the time)
          <form onSubmit={handleDeposit} className="py-2">
            <input
              id="depositAmount"
              type="number"
              step="0.01"
              className="form-control py-3"
              placeholder="Deposit"
              value={balance}
              required
              onChange={(event) => setBalance(event.target.value)}
            />
            <button type="submit" className="btn-primary btn my-1">
              Deposit
            </button>
          </form>
        </Tab>
        <Tab eventKey="withdraw" title="Withdraw">
          <br />
          How much do you want to withdraw with interest?
          <br />
          <button type="button" className="btn btn-primary my-1" onClick={handleWithdraw}>
            Withdraw
          </button>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default HomePage;
