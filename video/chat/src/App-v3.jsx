import {
  WeavyClient,
  WeavyProvider,
  Chat,
  Messenger,
  MessengerProvider,
  ConversationList,
  Conversation,
} from "@weavy/uikit-react";
import "@weavy/uikit-react/dist/css/weavy.css";
import { Icon, Button, Dropdown, Overlay } from "@weavy/uikit-react";
import MyButton from "./components/Chat";

const weavyClient = new WeavyClient({
  url: "https://fb4f36ac2b9249b89f530e3236d2caed.weavy.io",
  tokenFactory: async () => "wyu_b3JdxwPEWpY9EJy9xms1GIiBuMB4IU0EMZQj",
});

// Icon.UI = CustomIcon.UI;
// Button.UI = (<MyButton />).UI;
// Dropdown.UI = CustomDropdown.UI;
// Dropdown.Item = CustomDropdown.Item;
// Overlay.UI = CustomOverlay.UI;

function App() {
  return (
    <div className="App">
      <WeavyProvider client={weavyClient}>
        {/* <MessengerProvider>
          <ConversationList />
          <Conversation />
        </MessengerProvider> */}
        <Messenger />
        {/* <Chat uid="demochat" /> */}
      </WeavyProvider>
    </div>
  );
}

export default App;
