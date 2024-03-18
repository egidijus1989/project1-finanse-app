import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import * as service from "../services/auth";
import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const logout = () => {
    service.logout(currentUser.token, dispatch, signoutSuccess);
    console.log(currentUser);
    navigate("/sign-in");
  };

  return (
    <Navbar className="border-b-2  py-4 w-full max-w-7xl mx-auto bg-white text-slate-900 dark:text-white dark:bg-slate-950">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-xl font-semibold"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-amber-500 via-purple-500 to-lime-500 rounded-lg">
          Expense & Income
        </span>
        Tracker
      </Link>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-12 sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{currentUser.data.email}</span>
              <span className="block text-sm font-medium truncate"></span>
            </DropdownHeader>
            <Link to="/dashboard">
              <DropdownItem>E & I</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={logout}>Sign Out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <button className="p-2 border-2 rounded-xl">Sign In</button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
