// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
import { useEffect, useState } from "react";
import { generateToken } from "./token";
// import { ZegoExpressEngine } from "zego-express-engine-webrtc";

// function randomID(len) {
//   let result = "";
//   if (result) return result;
//   var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export function getUrlParams(url = window.location.href) {
//   let urlStr = url.split("?")[1];
//   return new URLSearchParams(urlStr);
// }

const users = [
  { name: "Abbas Bhanpura wala", id: "1" },
  { name: "John Bhai", id: "2" },
];

export default function Chat() {
  const [user, setUser] = useState({});

  const appID = 1739795348;
  ZIM.create({ appID });
  const zim = ZIM.getInstance();

  const init = async () => {
    if (user.name) {
      //   const res = await fetch("http://127.0.0.1:8000/token", {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(user),
      //   });

      //   const { token } = await res.json();

      const token = generateToken(user.id, 3600);

      zim
        .login({ userID: user.id, userName: user.name }, token)
        .then(function () {
          // Login successful.
        })
        .catch(function (err) {
          // Login failed.
          console.log(err);
        });
    } else {
      alert("Select a user");
    }
  };

  useEffect(() => {
    init();
  }, [user]);

  const sendMessage = () => {
    var toConversationID = users.find((u) => u.id != user.id).id; // Peer user's ID.
    var conversationType = 0; // Conversation type, 1-on-1 chat: 0. In-room chat: 1. Group chat: 2.
    var config = {
      priority: 1, // Set message priority. Low: 1 (by default). Medium: 2. High: 3.
    };

    var messageTextObj = {
      type: 1,
      message: `Hello ${users.find((u) => u.id != user.id).name}`,
      extendedData: "Extension info of the message (optional)",
    };
    var notification = {
      onMessageAttached: function (message) {
        // todo: Loading
      },
    };

    zim
      .sendMessage(
        messageTextObj,
        toConversationID,
        conversationType,
        config,
        notification
      )
      .then(function ({ message }) {
        // c
      })
      .catch(function (err) {
        // Failed to send message.
      });
  };

  // Callback for receiving the one-to-one message.
  zim.on(
    "receivePeerMessage",
    function (zim, { messageList, fromConversationID }) {
      console.log(messageList, fromConversationID);
    }
  );

  return (
    <>
      <button onClick={() => setUser(users[0])}>Abbas</button>
      <button onClick={() => setUser(users[1])}>John</button>
      <h2>I am {user?.name}</h2>
      <div
        className="chat-container"
        style={{ width: "100vw", height: "100vh" }}
      >
        <input type="text" />
        <button onClick={sendMessage}>send Message</button>
      </div>
    </>
  );
}
