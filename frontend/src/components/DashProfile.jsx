import {
  Alert,
  Button,
  TextInput,
  Modal,
  ModalHeader,
  ModalBody,
} from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import * as service from "../services/auth";

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const logout = () => {
    service.logout(currentUser.token, dispatch, signoutSuccess);
    console.log(currentUser);
    navigate("/sign-in");
  };

  const updateUser = (e) => {
    setUpdateUserError(null);
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    service.updateUser(
      formData,
      dispatch,
      updateStart,
      updateFailure,
      updateSuccess,
      setUpdateUserError,
      setUpdateUserSuccess,
      currentUser.data.id,
      currentUser.token
    );
  };
  const deleteUser = () => {
    setShowModal(false);
    service.deleteUser(
      dispatch,
      deleteStart,
      deleteSuccess,
      deleteFailure,
      currentUser.data.id,
      currentUser.token
    );
    navigate("/sign-in");
  };
  return (
    <div className="max-w-[35%] mx-auto m-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl uppercase">
        Profile
      </h1>
      <form className="flex flex-col gap-4" onSubmit={updateUser}>
        <TextInput
          type="text"
          id="name"
          placeholder="name"
          defaultValue={currentUser.data.name}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.data.email}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="text"
          id="password"
          placeholder="password"
          onChange={handleChange}
        ></TextInput>
        <Button type="submit" gradientDuoTone="pinkToOrange" outline>
          {loading ? "Loading" : "Update"}
        </Button>
      </form>
      <div className="text-purple-500 flex justify-between mt-5">
        <span
          onClick={() => {
            setShowModal(true);
          }}
          className="cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={logout} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-800 dark:text-gray-200 mb-4 mx-auto" />
          <h3 className="mb-5 text-lg text-black dark:text-white">
            Are you sure you want to delete account?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={deleteUser}>
              Yes
            </Button>
            <Button
              onClick={() => {
                setShowModal(false);
              }}
            >
              No
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DashProfile;
