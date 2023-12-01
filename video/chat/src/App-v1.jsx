import { CometChatUIKit } from "@cometchat/chat-uikit-react";

const UID = "1"; //Replace with your UID
const authKey = "6ac6994d6749363ac2352ee631a6c094d84426d8"; //Replace with your Auth Key

CometChatUIKit.getLoggedinUser().then((user) => {
  if (!user) {
    //Login user
    CometChatUIKit.login(UID, authKey)
      .then((user) => {
        console.log("Login Successful:", { user });
        //mount your app
      })
      .catch(console.log);
  } else {
    //mount your app
  }
});

const App = () => {
  return <div></div>;
};

export default App;
