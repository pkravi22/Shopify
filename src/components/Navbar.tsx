import { FC, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCartState } from "../redux/features/cartSlice";
import { updateModal } from "../redux/features/authSlice";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import CustomPopup from "./CustomPopup";
import { updateDarkMode } from "../redux/features/homeSlice";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(
    (state) => state.cartReducer.cartItems.length
  );
  const username = useAppSelector((state) => state.authReducer.username);
  const isDarkMode = useAppSelector((state) => state.homeReducer.isDarkMode);
  const { requireAuth } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const showCart = () => {
    requireAuth(() => dispatch(setCartState(true)));
  };

  return (
    <div className="py-4 bg-white dark:bg-slate-800 top-0 sticky z-10 shadow-lg font-karla">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white"
            data-test="main-logo"
          >
            Shopify
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-white text-2xl lg:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navbar Links */}
          <div
            className={`absolute top-[60px] left-0 w-full bg-white dark:bg-slate-800 lg:static lg:flex lg:items-center lg:space-x-8 lg:w-auto ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0">
              <li>
                <Link
                  to="/products"
                  className="text-xl font-bold dark:text-white"
                  onClick={toggleMenu}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-xl font-bold dark:text-white"
                  onClick={toggleMenu}
                >
                  Categories
                </Link>
              </li>
              <li className="flex items-center gap-2">
                {username !== "" ? (
                  <img
                    src="https://robohash.org/Terry.png?set=set4"
                    alt="avatar"
                    className="w-6"
                  />
                ) : (
                  <FaUser className="text-gray-500 text-2xl dark:text-white" />
                )}
                <div className="text-gray-500 text-2xl">
                  {username !== "" ? (
                    <CustomPopup />
                  ) : (
                    <span
                      className="cursor-pointer hover:opacity-85 dark:text-white"
                      onClick={() => {
                        dispatch(updateModal(true));
                        toggleMenu();
                      }}
                    >
                      Login
                    </span>
                  )}
                </div>
              </li>
              <li className="relative">
                <div
                  onClick={showCart}
                  className="text-gray-500 text-[32px] cursor-pointer hover:opacity-80"
                  data-test="cart-btn"
                >
                  <AiOutlineShoppingCart className="dark:text-white" />
                  <div
                    className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
                    data-test="cart-item-count"
                  >
                    {cartCount}
                  </div>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    dispatch(updateDarkMode(!isDarkMode));
                    document.body.classList.toggle("dark");
                    toggleMenu();
                  }}
                >
                  {isDarkMode ? (
                    <MdOutlineLightMode className="cursor-pointer" size={30} />
                  ) : (
                    <MdOutlineDarkMode className="cursor-pointer" size={30} />
                  )}
                </div>
              </li>
            </ul>
          </div>

          {/* Search Input (Visible only on large screens) */}
          <div className="lg:flex hidden w-full max-w-[500px]">
            <input
              type="text"
              placeholder="Search for a product..."
              className="border-2 border-blue-500 px-6 py-2 w-full dark:text-white dark:bg-slate-800"
            />
            <div className="bg-blue-500 text-white text-[26px] grid place-items-center px-4">
              <BsSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
