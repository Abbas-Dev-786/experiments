// import SendbirdApp from "@sendbird/uikit-react/App";
import { App as SendbirdApp } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";

const App = () => {
  return (
    <div className="App">
      <SendbirdApp
        // Add the two lines below.
        appId={"9E93E943-CAE0-45E4-ABBD-FA12B3CB29E3"} // Specify your Sendbird application ID.
        userId={"user123"} // Specify your user ID.
        colorSet={{ main: "red" }}
        useMessageGrouping={false}
      />
    </div>
  );
};

export default App;
