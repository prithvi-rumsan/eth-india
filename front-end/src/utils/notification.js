import React, { createContext, useContext, useState } from "react";

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useWeb3React } from "@web3-react/core";

const NotificationContext = createContext(null);

export const NotificationContextProvider = ({ children }) => {
  const { account, library } = useWeb3React();

  const PK = "e86220869dca89d0330d0596751d3390dc589b57e22a95ac23510b8570bc8785";
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

  const sendNotification = async ({ title, body, receiver }) => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, //targeted
        identityType: 2,
        notification: {
          title: `${title}`,
          body: `${body}`,
        },

        payload: {
          title: `${title}`,
          body: `${body}`,
          cta: "",
          img: "",
        },
        recipients: `eip155:5:${receiver}`,
        channel: "eip155:5:0xB9820eDBb6da8137c57a0e49d50bE1B9Aa5D077B",
        env: "staging",
      });
      return apiResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const optinChannel = async () => {
    try {
      const subscribeSigner = library?.getSigner(account);

      await PushAPI.channels.subscribe({
        signer: subscribeSigner,
        channelAddress: `eip155:5:${signer}`,
        userAddress: `eip155:5:${account}`,
        onSuccess: () => {
          return "opt in success";
        },
        onError: () => {
          console.log("opt in err");
        },
        env: "staging",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        sendNotification,
        optinChannel,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
