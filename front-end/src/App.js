import { BrowserRouter, Routes, Route } from "react-router-dom";
import HOME from "./modules/home";
import ConnectWallet from "./modules/connect-wallet";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectWallet />}></Route>

        <Route path="/dashboard" element={<HOME />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
