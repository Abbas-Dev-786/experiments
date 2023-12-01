import {
  ZIMKitManager,
  Common,
  ConversationList,
  ZIMKitChatListVM,
  ZIMMessage,
  Chat,
} from "@zegocloud/zimkit-react";
import "@zegocloud/zimkit-react/index.css";
import { useEffect } from "react";

const appConfig = {
  appID: 1739795348, // The AppID you get from the ZEGOCLOUD admin console.
  serverSecret: "21639b4cb99f8c8f342c2963de51ebae", // The serverSecret you get from ZEGOCLOUD Admin Console.
};

const userInfo = {
  // Your ID as a user.
  userID: "user123",
  // Your name as a user.
  userName: "Test User",
  // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
  userAvatarUrl: "",
};

const Chatt = () => {
  useEffect(() => {
    const init = async () => {
      const zimKit = new ZIMKitManager();
      const token = zimKit.generateKitTokenForTest(
        appConfig.appID,
        appConfig.serverSecret,
        userInfo.userID
      );
      await zimKit.init(appConfig.appID);
      await zimKit.connectUser(userInfo, token);
    };

    init();
  }, []);

  return (
    <Common>
      <h1>Test</h1>
    </Common>
  );
};

export default Chatt;
