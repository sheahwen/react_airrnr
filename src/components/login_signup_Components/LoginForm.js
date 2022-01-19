import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import themeStyle from "../../theme/theme";
import { useHistory, Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";
// import useFetch from "../../hooks/useFetch";

const LoginForm = () => {
  let history = useHistory();
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});

  const initValue = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initValue);

  // const initialRun = useRef(true);

  // const [{ data, loading, error }, callFetch] = useFetch(
  //   process.env.REACT_APP_URL
  // );

  // useEffect(() => {
  //   if (initialRun.current) {
  //     initialRun.current = false;
  //     return;
  //   }
  //   console.log(error);
  //   console.log(data);
  // }, [data, error]);
  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const onChangeHandler = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const loginRequest = async (evt) => {
    evt.preventDefault();

    if (
      formData.email.trim().length === 0 ||
      formData.password.trim().length === 0
    ) {
      setError("Both fields are required");
      clearError();
      return;
    }
    const submitData = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });
    // const submitData = JSON.stringify({
    //   email: "shanna@melissa.tv",
    //   password: "123456",
    // });

    const response = await axios
      .post(process.env.REACT_APP_URL + "/users/login", submitData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    console.log(response);
    if (response.status === 200) {
      setUserInfo(response.data);
      history.push("/customer/home");
    } else if (response.data.status === "failed") {
      setError(response.data.msg);
      clearError();
    }

    // callFetch("/users/login", "POST", submitData);
  };

  return (
    <div className="row w-50 d-flex flex-column justify-content-center align-items-center">
      <form>
        {/* Email Input */}
        {error !== "" ? <span className="err-msg">{error}</span> : null}
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            id="loginEmail"
            placeholder="name@example.com"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
          <label htmlFor="loginEmail">Email address</label>
        </div>
        {/* Password Input */}
        <div className="form-floating">
          <input
            name="password"
            type="password"
            className="form-control"
            id="loginPassword"
            placeholder="Password"
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
          <label htmlFor="loginPassword">Password</label>
        </div>
        <div className="mt-4 d-flex justify-content-center align-items-center">
          <button
            type="submit"
            className="btn btn-primary starter-button"
            id="loginSubmit"
            onClick={loginRequest}
            style={{
              backgroundColor: `${themeStyle.color.primary.normal}`,
              borderColor: `${themeStyle.color.primary.normal}`,
            }}
          >
            <div>
              <FaSignInAlt size={20} />
              <span className="ms-2">Sign In</span>
            </div>
          </button>
        </div>
      </form>
      <div className="row d-flex flex-column justify-content-center align-items-center">
        <span className="text-center text-muted fw-bold fs-5 my-3">or</span>
        <button
          type="submit"
          className="btn btn-primary starter-button text-black"
          style={{
            backgroundColor: `${themeStyle.color.secondary.light}`,
            borderColor: `${themeStyle.color.secondary.light}`,
          }}
        >
          User Sign Up
        </button>
        <p
          className="fs-5 text-center my-3"
          style={{ color: `${themeStyle.color.secondary.dark}` }}
        >
          If you are a Restaurant Retailer, please use below button to sign up!
        </p>
        <Link
          to="/restaurant/new"
          className="btn btn-primary starter-button text-black d-flex flex-column justify-content-center"
          style={{
            backgroundColor: `${themeStyle.color.secondary.light}`,
            borderColor: `${themeStyle.color.secondary.light}`,
          }}
        >
          <div>Restaurant Sign Up</div>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
