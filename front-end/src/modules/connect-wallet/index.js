import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Card from "../../components/card";
import "./connect-wallet.css";

function ConnectWallet() {
  const handleConnectWallet = () => {
    console.log("HANDLE CONNECT WALLET");
  };
  return (
    <Container className="full-center">
      <div className="card-container">
        <Card>
          <div className="title-container">
            Connect To Metamask
            <div className="image-container">
              <Image src="/metamask.png" fluid />
            </div>
          </div>
          <br />
          <div className="button-container">
            <Button onClick={handleConnectWallet}>Connect</Button>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default ConnectWallet;
