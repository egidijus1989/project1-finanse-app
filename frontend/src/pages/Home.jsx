import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-[50%] mx-auto flex-col text-xs md:text-3xl items-center">
        <div className=" p-3">
          Welcome to
          <span className="px-2 py-1 bg-gradient-to-r from-amber-500 via-purple-500 to-lime-500 rounded-lg">
            Expense & Income
          </span>{" "}
          tracker
        </div>
        <div className="p-3">your YTD expenses and incomes</div>
      </div>
    </div>
  );
};

export default Home;
