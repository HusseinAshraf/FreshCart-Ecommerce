import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import BtnLoading from "../BtnLoading/BtnLoading";

export default function ShippingAddress() {
  let { cartId } = useParams();
  const [loading, setLoading] = useState(false);
  let { checkOutSession, CashOrder, setCounter, getCartItem } =
    useContext(CartContext);

  let navigate = useNavigate();

  async function sendVisaPayment(values) {
    setLoading(true);
    let { data } = await checkOutSession(cartId, values);

    if (data.status === "success") {
      setLoading(false);
      window.location.href = data.session.url;
      toast.success("Payment complete successfully!");
    }
  }
  async function sendCashPayment(values) {
    setLoading(true);
    let { data } = await CashOrder(cartId, values);
    console.log(data.status);
    if (data?.status === "success") {
      toast.success("Payment complete successfully!");
      setLoading(false);
      setCounter(data.numOfCartItems);
      navigate("/allOrders");
      getCartItem();
    }
  }

  let address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (values) => {
      sendVisaPayment(values);
    },
  });

  let addressForCash = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (values) => {
      sendCashPayment(values).then(() => {
        navigate("/allOrders"); // Navigate to the success page or any other route
        toast.success("Payment complete successfully!");
        setCounter(0);
      });
    },
  });

  return (
    <div className="container">
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <Tabs className="mt-5">
        <TabList className="check-pay text-center mb-5">
          <Tab style={{ bottom: -16 }}>
            Visa <i className="fa-brands fa-cc-visa"></i>
          </Tab>
          <Tab style={{ bottom: -16 }}>
            Cash <i className="fa-solid fa-money-bill-1-wave"></i>
          </Tab>
        </TabList>

        <TabPanel className="">
          <div className="w-75 mx-auto py-5">
            <form onSubmit={address.handleSubmit}>
              <label htmlFor="details">Details</label>
              <input
                onChange={address.handleChange}
                type="text"
                id="details"
                name="details"
                className="form-control mb-3"
              />
              <label htmlFor="phone">Phone</label>

              <input
                onChange={address.handleChange}
                type="tel"
                id=""
                name="phone"
                className="form-control mb-3"
              />
              <label htmlFor="city">City</label>
              <input
                onChange={address.handleChange}
                type="text"
                id="city"
                name="city"
                className="form-control mb-3"
              />

              {loading ? (
                <BtnLoading />
              ) : (
                <button
                  disabled={!(address.isValid && address.dirty)}
                  type="submit"
                  className="btn bg-main text-light"
                >
                  Visa
                </button>
              )}
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="w-75 mx-auto py-5">
            <form onSubmit={addressForCash.handleSubmit}>
              <label htmlFor="details">Details</label>
              <input
                onChange={addressForCash.handleChange}
                type="text"
                id="details"
                name="details"
                className="form-control mb-3"
              />
              <label htmlFor="phone">Phone</label>

              <input
                onChange={addressForCash.handleChange}
                type="tel"
                id=""
                name="phone"
                className="form-control mb-3"
              />
              <label htmlFor="city">City</label>
              <input
                onChange={addressForCash.handleChange}
                type="text"
                id="city"
                name="city"
                className="form-control mb-3"
              />

              {loading ? (
                <BtnLoading />
              ) : (
                <button
                  disabled={!(addressForCash.isValid && addressForCash.dirty)}
                  type="submit"
                  className="btn bg-main text-light"
                >
                  Cash Order
                </button>
              )}
            </form>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
