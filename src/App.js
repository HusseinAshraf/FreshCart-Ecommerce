import { useContext, useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import NewPassword from "./components/NewPassword/NewPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import SubCategory from "./components/SubCategory/SubCategory";
import { Toaster } from "react-hot-toast";
import ShippingAddress from "./components/ShippingAddress/ShippingAddress";
import AllOrders from "./components/AllOrders/AllOrders";
import WishList from "./components/WishList/WishList";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile/Profile";
import UpdateData from "./components/UpdateData/UpdateData";
import UpdateYourPassword from "./components/UpdateYourPassword/UpdateYourPassword";
import { Offline } from "react-detect-offline";
import ScrollBtn from "./components/ScrollBtn/ScrollBtn";
import Loading from "./components/Loading/Loading";
import ProductOrder from "./components/AllOrders/ProductOrder";

function App() {
  let routers = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verifyCode", element: <VerifyCode /> },
        { path: "newPassword", element: <NewPassword /> },
        { path: "register", element: <Register /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "subCategory/:id",
          element: (
            <ProtectedRoute>
              <SubCategory />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "shippingAddress/:cartId",
          element: (
            <ProtectedRoute>
              <ShippingAddress />
            </ProtectedRoute>
          ),
        },
        {
          path: "allOrders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "productOrder/:index",
          element: (
            <ProtectedRoute>
              <ProductOrder />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "updateData",
          element: (
            <ProtectedRoute>
              <UpdateData />
            </ProtectedRoute>
          ),
        },
        {
          path: "updateYourPassword",
          element: (
            <ProtectedRoute>
              <UpdateYourPassword />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  let { setUserToken } = useContext(UserContext);
  
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
      <ToastContainer theme="colored" autoClose={1000} />
      <Offline>
      <div className="offline">You Are offline Now!</div>
      </Offline>
      <ScrollBtn />
    </>
  );
}

export default App;
