import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import * as service from "../services/auth.js";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const registration = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setErrorMessage("Please fill all fields");
    }
    service.registration(formData, setLoading, setErrorMessage, navigate);
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-[50%] mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/">
            <span className="px-2 py-1 bg-gradient-to-r from-amber-500 via-purple-500 to-lime-500 rounded-lg">
              Expense & Income
            </span>
            Tracker
          </Link>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={registration}>
            <div className="">
              <Label value="Your name" />
              <TextInput
                type="text"
                placeholder="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="border-2 py-2 rounded-xl hover:bg-amber-500 active:bg-amber-800"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-2">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-lime-500 font-bold">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <p className="mt-5" color="failure">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
