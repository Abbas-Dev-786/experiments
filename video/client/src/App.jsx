import { Route, Routes } from "react-router-dom";
import Meeting from "./Meeting";
import Test from "./Test";
import Chat from "./Chat";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<h1>Me hun ek home page</h1>} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;
