import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Meeting from "./Meeting";
// import Product from "./Product";
// import { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

function App() {
  // const [stripePromise, setStripePromise] = useState(null);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/v1/tr/config").then(async (r) => {
  //     const { publishableKey } = await r.json();
  //     setStripePromise(loadStripe(publishableKey));
  //   });
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meeting" element={<Meeting />} />
      {/* <Route
        path="/products"
        element={<Product stripePromise={stripePromise} />}
      /> */}
    </Routes>
  );
}

export default App;
