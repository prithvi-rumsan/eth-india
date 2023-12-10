
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import * as ethers from "ethers";


export const sendNotification = async ({ title, body, receiver }) => {
  const PK = process.env.REACT_APP_PUSH_KEY;
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);
  try {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING
    })
    const apiResponse = await user.channel.send(['*'], {
      notification: {
        title: `${title}`,
        body: `${body}`,
      }
    });
    return apiResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
};


