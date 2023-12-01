import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Product = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [productData, setProductData] = useState([]);

  const getProductsData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/data");
      const { data } = await res.json();

      setProductData(data);
    } catch (error) {
      console.log(error + "🔎");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/tr/create-payment-intent")
      .then((res) => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret));
  }, []);

  const handleBuy = (e) => {
    e.preventDefault();

    alert(e.target.id);
  };

  return (
    <table cellSpacing={20} cellPadding={30}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Buy Now</th>
        </tr>
      </thead>
      <tbody>
        {productData?.map((data, i) => (
          <tr key={i}>
            <td>{data.name}</td>
            <td>{data.price}</td>
            <td>
              <Elements stripe={props.stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Product;
