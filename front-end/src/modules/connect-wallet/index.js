import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Card from "../../components/card";
import { injected } from "../../utils/wallet";
import { useWeb3React } from "@web3-react/core";
import "./connect-wallet.css";

function ConnectWallet() {
  const { activate, deactivate } = useWeb3React();

  const connectMetaMask = async () => {
    console.log("connectMetaMask");
    try {
      if (typeof window.ethereum === "undefined") {
        console.log("MetaMask is not installed!");
        return false;
      }
      await activate(injected);
      console.log("activate");
      localStorage.setItem("wallet-auth", "MetaMask");
      window.location.href = "/dashboard";
      // await contractCall()
      return true;
    } catch (e) {
      console.log(e);
      localStorage.removeItem("wallet-auth");
    }
  };

  const disconnectWallet = async () => {
    try {
      deactivate();
      localStorage.removeItem("wallet-auth");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="full-center">
      <div className="card-container">
        <Card>
          <div className="title-container">
            Connect Metamask Wallet
            <div className="image-container">
              <Image src="/metamask.png" fluid />
            </div>
          </div>
          <br />
          <br />
          <Button onClick={connectMetaMask} style={{ marginBottom: "10px" }}>
            Connect
          </Button>
          {/* <Button onClick={disconnectWallet} variant="danger">
            Disconnect
          </Button> */}
        </Card>
      </div>
    </Container>
  );
}

export default ConnectWallet;
