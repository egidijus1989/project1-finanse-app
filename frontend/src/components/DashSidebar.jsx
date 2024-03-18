import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useSelector } from "react-redux";
import { HiChartPie, HiUser, HiArrowSmRight } from "react-icons/hi";
import { IoPieChartOutline } from "react-icons/io5";
import { FaPlus, FaMinus, FaList } from "react-icons/fa";
import * as service from "../services/auth";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const logout = () => {
    service.logout(currentUser.token, dispatch, signoutSuccess);
    console.log(currentUser);
    navigate("/sign-in");
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                icon={HiChartPie}
                as="div"
                active={tab === "dash" || !tab}
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=addIncome">
            <Sidebar.Item
              active={tab === "newIncome"}
              icon={FaPlus}
              labelColor="dark"
              as="div"
            >
              Log new Income
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=allIncomes">
            <Sidebar.Item
              active={tab === "allIncomes"}
              icon={FaList}
              labelColor="dark"
              as="div"
            >
              All incomes
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=chartIncomes">
            <Sidebar.Item
              active={tab === "chartIncomes"}
              icon={IoPieChartOutline}
              labelColor="dark"
              as="div"
            >
              Incomes grouped
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=addExpense">
            <Sidebar.Item
              active={tab === "newExpense"}
              icon={FaMinus}
              labelColor="dark"
              as="div"
            >
              Log new expense
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=allExpenses">
            <Sidebar.Item
              active={tab === "allExpenses"}
              icon={FaList}
              labelColor="dark"
              as="div"
            >
              All expenses
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=chartExpenses">
            <Sidebar.Item
              active={tab === "chartExpenses"}
              icon={IoPieChartOutline}
              labelColor="dark"
              as="div"
            >
              Expenses grouped
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursorPointer"
            onClick={logout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
