import { InjectedConnector } from "@web3-react/injected-connector";
export const ChainId = {

    SCROLL_CHAIN: 534351,
    POLYGON_CHAIN: 80001,
};

const supportedChainIds = Object.values(ChainId);

export const injected = new InjectedConnector({
    supportedChainIds,
});
