import { InjectedConnector } from "@web3-react/injected-connector";
export const ChainId = {

    SCROLL_CHAIN: 5384351,
};

const supportedChainIds = Object.values(ChainId);

export const injected = new InjectedConnector({
    supportedChainIds,
});
