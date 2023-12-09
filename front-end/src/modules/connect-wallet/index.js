import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./connect-wallet.css";
import Card from "../../components/card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ConnectWallet() {
  const handleConnectWallet = () => {
    console.log("HANDLE CONNECT WALLET");
  };
  return (
    <Container className="full-center">
      <Card>
        <div className="title-container">
          Connect To Metamask
          <div className="image-container">
            <Image src="/metamask.png" fluid />
          </div>
        </div>
        <br />
        <Button onClick={handleConnectWallet}>Connect</Button>
      </Card>
    </Container>
  );
}

export default ConnectWallet;
