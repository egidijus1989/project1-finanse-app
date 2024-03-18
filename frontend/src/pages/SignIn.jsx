import { Alert, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice.js";
import * as service from "../services/auth.js";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const login = async (e) => {
    e.preventDefault();
    service.login(
      formData,
      dispatch,
      signInStart,
      signInSuccess,
      signInFailure,
      navigate
    );
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
          <form className="flex flex-col gap-4" onSubmit={login}>
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
                "Sign In"
              )}
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-2">
            <span>Dont have account?</span>
            <Link to="/sign-up" className="text-lime-500 font-bold">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              Something went wrong
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
