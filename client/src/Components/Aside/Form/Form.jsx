import React, { useState } from "react";
import "./form.scss";

// COMPONENTS
import Loader from "./Loader/Loader";

// MUI
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";

// ICONS
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { signin, signup, error } from "../../../actions/auth";

// LIBS
import FileBase from "react-file-base64";

const Form = ({ isSignIn, setIsSignIn }) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    selectedFile: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [infoMsg, setInfoMsg] = useState(
    useSelector((state) => state.auth.infoMsg) || ""
  );
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);
  // const { infoMsg } = useSelector((state) => state.auth);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const submit = (e) => {
    e.preventDefault();
    setInfoMsg("Checking");

    if (!isSignIn) {
      if (formState.password !== formState.confirmPassword) {
        setInfoMsg("Password does't match !");
        return;
      }
    }

    if (!formState.password.length) {
      setInfoMsg("Password must be 6 letters or higher !");
      return;
    }

    if (isSignIn) {
      dispatch(signin(formState));
    } else {
      dispatch(signup(formState));
    }

    setTimeout(() => {
      dispatch(error());
    }, 4000);

    if (isSignIn) {
      setFormState({ ...formState, password: "" });
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const changeForm = () => {
    setIsSignIn((prevState) => !prevState);
  };

  return (
    <form action="" method="POST" className="form" onSubmit={submit}>
      {isLoading && <Loader />}
      <h2 className="form__title" style={{ marginBottom: "10px" }}>
        {isSignIn ? "Sign In" : "Sign Up"}
      </h2>
      {!isSignIn && (
        <>
          <TextField
            fullWidth
            style={{ marginBottom: "10px" }}
            name="firstName"
            type="text"
            label="First Name"
            value={formState.firstName}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            style={{ marginBottom: "10px" }}
            name="lastName"
            type="text"
            label="Last Name"
            value={formState.lastName}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            style={{ marginBottom: "10px" }}
            name="userName"
            type="text"
            label="Username"
            value={formState.userName}
            onChange={handleChange}
            variant="outlined"
          />
        </>
      )}

      <TextField
        fullWidth
        style={{ marginBottom: "10px" }}
        name="email"
        type="email"
        label="Email"
        value={formState.email}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        fullWidth
        style={{ marginBottom: "10px" }}
        name="password"
        label="Password"
        value={formState.password}
        onChange={handleChange}
        variant="outlined"
        type={showPassword ? "text" : "password"}
        handleChange={handleShowPassword}
        InputProps={
          true && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
      {!isSignIn && (
        <>
          <TextField
            fullWidth
            style={{ marginBottom: "10px" }}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            value={formState.confirmPassword}
            onChange={handleChange}
            variant="outlined"
          />
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setFormState({ ...formState, selectedFile: base64 })
            }
          />
        </>
      )}
      <p
        style={{
          color: infoMsg === "Logged in. Please wait." ? "green" : "red",
          marginBottom: "10px",
        }}
      >
        {infoMsg}
      </p>
      <Button
        color="primary"
        fullWidth
        type="submit"
        style={{ marginBottom: "10px" }}
        className="form__button"
      >
        {isSignIn ? "Sign in" : "Sign up"}
      </Button>
      <p onClick={changeForm} className="additional">
        {!isSignIn
          ? "Already have an account? Sign In"
          : "Don't have and account? Sign Up"}
      </p>
    </form>
  );
};

export default Form;
