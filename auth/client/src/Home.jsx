import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Home = () => {
  const handleGoogleLogin = (e) => {
    e.preventDefault();

    window.open("http://localhost:8000/api/v1/users/auth/google", "_self");
  };

  // const handleData = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/api/v1/data");
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error + "🔎");
  //   }
  // };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleGoogleLogin}>Login with Google</button>
        {/* <button onClick={handleData}>get Data</button> */}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Home;
