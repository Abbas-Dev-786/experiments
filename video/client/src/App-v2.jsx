import { useEffect, useState } from "react";

const App = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/token")
      .then((res) => res.json())
      .then((data) => setToken(data))
      .catch((err) => console.log(err));
  }, []);

  return <div>Messages</div>;
};

export default App;
