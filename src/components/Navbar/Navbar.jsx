import Style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext.js";
import { CartContext } from "../../Context/CartContext.js";
import { useQuery } from "react-query";
import { WishlistContext } from "../../Context/WishListContext.js";

export default function Navbar() {
  let { getCartItem, counter, setCounter } = useContext(CartContext);
  let { getWishListItems, wishListCount, setWishListCount } =
    useContext(WishlistContext);

  async function getCart() {
    let { data } = await getCartItem();
    setCounter(data?.numOfCartItems);
  }
  async function getWishList() {
    let { data } = await getWishListItems();
    setWishListCount(data?.data?.length);
  }

  useEffect(() => {
    getCart();
    getWishList();
  }, []);

  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary ${Style.Navbar}`}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo fresh cart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken != null ? (
                <>
                  <li className="nav-item fit-content">
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item fit-content">
                    <NavLink className="nav-link" to="/products">
                      Products
                    </NavLink>
                  </li>

                  <li className="nav-item fit-content">
                    <NavLink className="nav-link" to="/categories">
                      Categories
                    </NavLink>
                  </li>

                  <li className="nav-item fit-content">
                    <NavLink className="nav-link" to="/brands">
                      Brands
                    </NavLink>
                  </li>
                  <li className="nav-item fit-content">
                    <NavLink className="nav-link" to="/allOrders">
                      All Orders
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
              </li>

              {userToken != null ? (
                <>
                  <li className="nav-item">
                    <Link  className={`nav-link `} to={'/profile'}>
                    <i className="fa-solid fa-circle-user fs-5 text-black"></i>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="btn nav-link position-relative me-2 border-0"
                      to="/cart"
                    >
                      <i className="fa-solid fa-cart-shopping text-black "></i>
                      {counter ? (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {counter}
                        </span>
                      ) : (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          0
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn nav-link position-relative me-2 border-0"
                      to="/wishList"
                    >
                      <i className="fa-solid fa-heart text-black "></i>
                      {wishListCount ? (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {wishListCount}
                        </span>
                      ) : (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          0
                        </span>
                      )}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <NavLink onClick={logOut} className={`nav-link mx-3`}>
                      Log Out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className={`nav-link `} to="/login">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item ">
                    <NavLink className={`nav-link`} to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
