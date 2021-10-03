import { toast } from "react-toastify";
import Admin from "../abis/Admin.json";
import { db } from "./firebase";

export const messageAdmin = async (info, message) => {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const AdminData = await Admin.networks[networkId];
  const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
  const owner = await admin.methods?.owner().call();
  var key = "";
  if (owner < accounts[0]) key = owner + "#" + accounts[0];
  else key = accounts[0] + "#" + owner;
  try {
    await db
      .collection("chats")
      .doc(key)
      .collection("chatmessages")
      .add({
        info: { ...info, ethAddress: accounts[0] },
        message: message,
        sender: accounts[0],
        receiver: owner,
        timeStamp: new Date(),
      });
    toast.success("One of the admins will get back to you shortly!");
  } catch (err) {
    console.log(err);
  }
};
