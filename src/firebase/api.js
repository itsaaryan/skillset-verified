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

    const doc = await db
      .collection("users")
      .doc(accounts[0])
      .collection("activechats")
      .doc(owner)
      .get();
    if (!doc.exists) {
      await db
        .collection("users")
        .doc(accounts[0])
        .collection("activechats")
        .doc(owner)
        .set({
          name: "Admin",
          ethAddress: owner,
        });
      await db
        .collection("users")
        .doc(owner)
        .collection("activechats")
        .doc(accounts[0])
        .set({
          name: info.name,
          ethAddress: accounts[0],
        });
    }
    toast.success("One of the admins will get back to you shortly!");
  } catch (err) {
    console.log(err);
  }
};

export const reqWorkexpEndorsementFunc = async (workexp) => {
  const { organization, role, startdate, enddate, description } = workexp;
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var key;
  if (organization < accounts[0]) {
    key = organization + "#" + accounts[0];
  } else {
    key = accounts[0] + "#" + organization;
  }
  try {
    await db
      .collection("chats")
      .doc(key)
      .collection("chatmessages")
      .add({
        info: {
          req: "Work Experience Endorsement Request",
          description,
          organization,
          startdate,
          enddate,
          role,
          ethAddress: accounts[0],
        },
        message: "Please endorse!!",
        sender: accounts[0],
        receiver: organization,
        timeStamp: new Date(),
      });
    const doc = await db
      .collection("users")
      .doc(accounts[0])
      .collection("activechats")
      .doc(organization)
      .get();
    if (!doc.exists) {
      await db
        .collection("users")
        .doc(accounts[0])
        .collection("activechats")
        .doc(organization)
        .set({
          name: "Organization",
          ethAddress: organization,
        });
      await db
        .collection("users")
        .doc(organization)
        .collection("activechats")
        .doc(accounts[0])
        .set({
          name: "Employee",
          ethAddress: accounts[0],
        });
    }
    toast.success("Endorsement request sent!!");
  } catch (err) {
    console.log(err);
  }
};

export const reqEducationEndorsementFunc = async (education) => {
  const { institute, description, startdate, enddate } = education;
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var key;
  if (institute < accounts[0]) {
    key = institute + "#" + accounts[0];
  } else {
    key = accounts[0] + "#" + institute;
  }
  try {
    await db
      .collection("chats")
      .doc(key)
      .collection("chatmessages")
      .add({
        info: {
          req: "Education Endorsement Request",
          description,
          institute,
          startdate,
          enddate,
          ethAddress: accounts[0],
        },
        message: "Please endorse!!",
        sender: accounts[0],
        receiver: institute,
        timeStamp: new Date(),
      });
    const doc = await db
      .collection("users")
      .doc(accounts[0])
      .collection("activechats")
      .doc(institute)
      .get();
    if (!doc.exists) {
      await db
        .collection("users")
        .doc(accounts[0])
        .collection("activechats")
        .doc(institute)
        .set({
          name: "Institute",
          ethAddress: institute,
        });
      await db
        .collection("users")
        .doc(institute)
        .collection("activechats")
        .doc(accounts[0])
        .set({
          name: "Employee",
          ethAddress: accounts[0],
        });
    }
    toast.success("Endorsement request sent!!");
  } catch (err) {
    console.log(err);
  }
};

export const reqCertiEndorsementFunc = async (certification) => {
  const { name, organization, score } = certification;
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var key;
  if (organization < accounts[0]) {
    key = organization + "#" + accounts[0];
  } else {
    key = accounts[0] + "#" + organization;
  }
  try {
    await db
      .collection("chats")
      .doc(key)
      .collection("chatmessages")
      .add({
        info: {
          req: "Certification Endorsement Request",
          name,
          organization,
          score,
          ethAddress: accounts[0],
        },
        message: "Please endorse!!",
        sender: accounts[0],
        receiver: organization,
        timeStamp: new Date(),
      });
    const doc = await db
      .collection("users")
      .doc(accounts[0])
      .collection("activechats")
      .doc(organization)
      .get();
    if (!doc.exists) {
      await db
        .collection("users")
        .doc(accounts[0])
        .collection("activechats")
        .doc(organization)
        .set({
          name: "Certification Organization",
          ethAddress: organization,
        });
      await db
        .collection("users")
        .doc(organization)
        .collection("activechats")
        .doc(accounts[0])
        .set({
          name: "Certified Employee",
          ethAddress: accounts[0],
        });
    }
    toast.success("Endorsement request sent!!");
  } catch (err) {
    console.log(err);
  }
};
