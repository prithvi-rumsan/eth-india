import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./home.css";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import Table from "react-bootstrap/Table";

const mockProposals = [
  { name: "proposal 1", status: 10 },
  { name: "proposal 2", status: 20 },
  { name: "proposal 3", status: 30 },
  { name: "proposal 4", status: 40 },
];

function HOME() {
  const [proposalName, setProposalName] = useState("");
  const [proposalList, setProposalList] = useState(mockProposals);
  const handleProposalSubmission = (e) => {
    console.log("PROPOSAL SUBMIT");
  };
  const handleVotingStart = () => {
    console.log("VOTING START");
  };
  const handleVotingEnd = () => {
    console.log("VOTING END");
  };
  const handleProposalFormSubmit = (e) => {
    e.preventDefault();
    console.log("FORM SUBMIT HANDLE");
    console.log(proposalName);
    const payload = {
      name: proposalName,
    };
    setProposalList((prev) => [...prev, payload]);
  };
  const handleViewStatus = (proposalName) => {
    console.log("VIEW DETAILS OF PROPOSAL", proposalName);
  };

  useEffect(() => {
    console.log("proposal name", proposalName);
  }, [proposalName]);

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
              Voting Start
            </Button>
            <br />
          </Col>
          <Col md={4} xs={4} className="end">
            <Button variant="danger" onClick={handleVotingEnd}>
              Voting End
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
              <Form.Label>Proposal Name</Form.Label>
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
                  <td>{i}</td>
                  <td>{el.name}</td>
                  <td className="center">
                    <Button variant="light" onClick={handleViewStatus(el.name)}>
                      Details
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
