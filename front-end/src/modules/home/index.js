import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./home.css";
import { useCallback, useEffect, useState } from "react";
import Card from "../../components/card";
import Table from "react-bootstrap/Table";
import { injected } from "../../utils/wallet";
import Web3 from "web3";
import Contract from "../../contract/abi/simpleDAO.json";
import { useWeb3React } from "@web3-react/core";
import { makeContract } from "../../utils/contract";
import { sendNotification } from "../../utils/notification";
import { CONTRACT_ADDRESS } from "../../constants/blockchainConstants";
const mockProposals = [
  { name: "DEFI Proposal", status: 13 },
  { name: "NFT Proposal", status: 20 },
  { name: "Open Identity Proposal", status: 3 },
];

function HOME() {

  const { library, account, activate } = useWeb3React();
  const [proposalName, setProposalName] = useState("");
  const [proposalList, setProposalList] = useState(mockProposals);
  const [contract, setContract] = useState(null);

  // function to get contract instance 
  const getContract = useCallback(async () => {

    try {
      //change the contract address
      const contract = makeContract(library, Contract, CONTRACT_ADDRESS.dao);
      setContract(contract);
      //can use the contract state variable to call the contract functions
      console.log("contract", contract);
    }
    catch (e) {
      console.log(e);
    }

  }, [library])
  const handleProposalSubmission = (e) => {
    console.log("PROPOSAL SUBMIT");
  };
  const handleVotingStart = () => {
    console.log("VOTING START");
  };
  const handleVotingEnd = () => {
    console.log("VOTING END");
  };
  const handleProposalFormSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM SUBMIT HANDLE");
    let tx1 = await contract.methods.owner().call()
    console.log(tx1)
    console.log(proposalName);
    const payload = {
      name: proposalName,
    };
    setProposalList((prev) => [...prev, payload]);
    let tx = await contract.methods
      .submitProposal(`${proposalName}`)
      .send({ from: account, gas: 1000000 })
    console.log(tx)
    await sendNotification({ title: 'Proposal submitted', body: proposalName, receiver: tx1 })

  };
  const handleViewStatus = (proposalName) => {
    console.log("VIEW DETAILS OF PROPOSAL", proposalName);
  };

  useEffect(() => {
    if (!library) return;
    console.log("proposal name", proposalName);
    // call the contract 
    getContract();
  }, [proposalName, library, getContract]);

  //reconnect metaMask after refresh
  useEffect(() => {
    const auth = localStorage.getItem("wallet-auth");
    if (auth === "MetaMask") {
      activate(injected);
      console.log({ account })
    }
  }, [activate, account])

  return (
    <Container className="homeContainer">
      <Card>
        <Row>
          <Col md={4} xs={4} className="start">
            <Button variant="primary" onClick={handleProposalSubmission}>
              Proposal Submissions
            </Button>
            <br />
          </Col>
          <Col md={4} xs={4} className="center">
            <Button variant="light" onClick={handleVotingStart}>
              Enable Voting
            </Button>
            <br />
          </Col>
          <Col md={4} xs={4} className="end">
            <Button variant="danger" onClick={handleVotingEnd}>
              Stop Voting
            </Button>
            <br />
          </Col>
        </Row>
      </Card>
      <br />
      <Card>
        <Row>
          <Form onSubmit={handleProposalFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Submit Proposal</Form.Label>
              <br />
              <input
                required
                value={proposalName}
                onChange={(e) => setProposalName(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Card>
      <br />
      <Card>
        <Table
          striped
          bordered
          hover
          variant="primary"
          style={{ marginBottom: 0 }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Proposal Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {proposalList.map((el, i) => {
              return (
                <tr key={el.name + i}>
                  <td>{i + 1}</td>
                  <td>{el.name}</td>
                  <td className="center">
                    <Button variant="light" onClick={handleViewStatus(el.name)}>
                      View Status
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default HOME;
