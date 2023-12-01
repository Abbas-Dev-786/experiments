import {
  // ChannelFilters,
  // ChannelOptions,
  // ChannelSort,
  StreamChat,
} from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  TypingIndicator,
  Window,
  useChannelActionContext,
  useChannelStateContext,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/v2/css/index.css";

// const params = new Proxy(new URLSearchParams(window.location.search), {
//   get: (searchParams, property) => searchParams.get(property),
// });

const apiKey = "ay5uwuaez4jw";
const userId = "test";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdCJ9.QzADFK_ya5wx4rADVxlLNe2MUy7TEsD9gebAsiajJsY";

const filters = {
  members: { $in: [userId] },
  type: "messaging",
};
const options = { limit: 10, presence: true, state: true };
// const sort = { last_message_at: -1, updated_at: -1 };

const chatClient = StreamChat.getInstance(apiKey);

if (import.meta.env.VITE_CHAT_SERVER_ENDPOINT) {
  chatClient.setBaseURL(import.meta.env.VITE_CHAT_SERVER_ENDPOINT);
}

chatClient.connectUser({ id: userId }, userToken);

const ChannelInner = (props) => {
  const { sendMessage } = useChannelActionContext();

  const { channel } = useChannelStateContext();
  const { members } = channel.state || {};
  const userName = Object.values(members).filter(
    (user) => user.user_id !== userId
  )[0].user_id;

  const overrideSubmitHandler = (message, cid) => {
    const boldMessage = {
      ...message,
      text: `**${message.text}**`,
    };

    sendMessage(boldMessage);
  };

  return (
    <>
      <Window>
        {/* <ChannelHeader /> */}
        <div className="top">
          <div className="flex">
            <div className="avatar">A</div>
            <div>
              <div>{userName}</div>
              <TypingIndicator />
            </div>
          </div>
          <div className="flex">
            <p
              onClick={() => {
                sendMessage({
                  message: <button>Join this meeting</button>,
                  text: `Join this meeting https://ayush-portal-startup.vercel.app/dashboard/meetings/654264469e38713375c6c5f2 `,
                });
              }}
            >
              🎥
            </p>
            <p>📞</p>
          </div>
        </div>
        <MessageList />
        <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
      </Window>
      <Thread />
    </>
  );
};

const CustomSystemMessage = (props) => {
  const { Avatar = DefaultAvatar, message } = props;

  const { created_at = "", text, type, user } = message;
  const date = created_at.toString();

  if (type === "system") {
    return (
      <div className="custom-system-message">
        <span>
          Event: {text} at {date}
        </span>
        <span>
          Actor: <Avatar image={user?.image} shape={"square"} size={20} />
          {user?.name}
        </span>
      </div>
    );
  }

  return null;
};

const App = () => (
  <>
    <Chat client={chatClient}>
      <ChannelList filters={filters} showChannelSearch />
      <Channel MessageSystem={CustomSystemMessage}>
        <ChannelInner />
      </Channel>
    </Chat>
  </>
);

export default App;
