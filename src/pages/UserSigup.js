import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import themeStyle from "../theme/theme";
import AppBarHome from "../components/Shared/AppBarHome";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const UserSigup = () => {
  let history = useHistory();
  const initValue = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initValue);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});

  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const onChangeHandler = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const signUpRequest = async (evt) => {
    evt.preventDefault();
    for (const key in formData) {
      if (formData[key].trim().length === 0) {
        setError("All fields are required");
        clearError();
        return;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password are not identical");
      clearError();
      return;
    }
    const submitData = JSON.stringify({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
    });
    const response = await axios
      .post(process.env.REACT_APP_URL + "/users", submitData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    console.log(response);
    if (response.status === 201) {
      setUserInfo(response.data);
      // history.push("/user/profile");
      const userProps = {
        _id: response.data._id,
        hasRestaurant: response.data.hasRestaurant,
      };

      history.push({
        pathname: "/user/profile",
        state: { userProps },
      });
    } else if (response.data.status === "failed") {
      setError(response.data.msg);
      clearError();
    }
  };

  // {
  //   name: "Leanne Graham",
  //   username: "Bret",
  //   img: "https://randomuser.me/api/portraits/men/19.jpg",
  //   gender: "m",
  //   email: "Sincere@april.biz",
  //   phone: "1-770-736-8031 x56442",
  //   password: "123456",
  //   hasRestaurant: false,
  // },

  return (
    <>
      <AppBarHome title="User Sign Up Page" />
      <div className="container d-flex justify-content-center">
        <div className="card my-3 p-5" style={{ width: "45rem" }}>
          <form>
            {/* Email Input */}
            {error !== "" ? <span className="err-msg">{error}</span> : null}
            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Superman"
                value={formData.name}
                onChange={onChangeHandler}
                required
              />
              <label htmlFor="email">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="phone"
                className="form-control"
                id="phone"
                placeholder="6511111111"
                value={formData.phone}
                onChange={onChangeHandler}
                required
              />
              <label htmlFor="email">Phone</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={onChangeHandler}
                required
              />
              <label htmlFor="email">Email address</label>
            </div>
            {/* Password Input */}
            <div className="form-floating mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                id="Password"
                placeholder="Password"
                value={formData.password}
                onChange={onChangeHandler}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating">
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={onChangeHandler}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <div className="mt-4 d-flex justify-content-center align-items-center">
              <button
                type="submit"
                className="btn btn-primary starter-button"
                id="loginSubmit"
                onClick={signUpRequest}
                style={{
                  backgroundColor: `${themeStyle.color.primary.normal}`,
                  borderColor: `${themeStyle.color.primary.normal}`,
                }}
              >
                <div>
                  <FaSignInAlt size={20} />
                  <span className="ms-2">Sign Up</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSigup;
